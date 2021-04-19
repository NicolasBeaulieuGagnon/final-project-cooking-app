const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const uuidv = require("uuid").v4;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createPost = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { userId, post, postImage } = req.body;
  await client.connect();
  const db = client.db("recipe-app");
  console.log("connected");

  try {
    const _id = uuidv();
    const posted = new Date().toISOString();
    const user = await db.collection("users").findOne({ _id: userId });

    const newPost = {
      _id,
      post,
      postImage,
      posted,
      author: {
        handle: user.userName,
        authorAvatarSrc: user.avatarSrc,
        authorId: user._id,
        numOfFollowers: user.numOfFollowers,
        numOfLikes: user.numOfLikes,
        joined: user.joined,
        hasCookBook: user.hasCookBook,
        cookBook: user.cookBook,
      },
      numLikes: 0,
      likedBy: [],
      comments: [],
      followedBy: [],
      edited: false,
    };

    const postResult = await db
      .collection("newsFeed")
      .insertOne({ ...newPost });

    postResult
      ? res
          .status(202)
          .json({ status: 202, data: newPost, message: "created Post" })
      : res.status(400).json({
          status: 400,
          data: newPost,
          message: "something is wrong with newPost object",
        });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const editPost = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { postId } = req.params;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const { post } = req.body;
    const query = { _id: postId };
    const newValue = { $set: { edited: true, post } };

    const result = await db.collection("newsFeed").updateOne(query, newValue);
    assert.strictEqual(1, result.matchedCount);

    res.status(202).json({
      status: 202,
      data: newValue,
      message: "edited post successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      data: { postId, changes: req.body },
      message: err.message,
    });
  }
  client.close();
  console.log("disconnect");
};

const changePost = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("recipe-app");
  console.log("connected");
  const {
    reason,
    userId,
    postId,
    numberAmount,
    arrayOfIds,
    authorId,
  } = req.body;
  try {
    let arrayChanges;
    let numberChanges;
    let targetCollection;
    let query;

    const postAuthor = await db.collection("users").findOne({ _id: authorId });
    const userQuery = { _id: userId };
    switch (reason) {
      case "like":
        targetCollection = "newsFeed";
        query = { _id: postId };

        arrayChanges = { $addToSet: { likedBy: userId } };
        numberChanges = { $set: { numLikes: numberAmount + 1 } };
        const changedAuthorValue = {
          $set: { numOfLikes: postAuthor.numOfLikes + 1 },
        };
        const authorQuery = { _id: authorId };
        await db.collection("users").updateOne(authorQuery, changedAuthorValue);
        break;

      case "unlike":
        const newArrayOfIds = arrayOfIds.filter((id) => {
          return id !== userId;
        });

        targetCollection = "newsFeed";
        query = { _id: postId };

        arrayChanges = { $set: { likedBy: newArrayOfIds } };
        numberChanges = { $set: { numLikes: numberAmount - 1 } };

        break;

      case "follow":
        targetCollection = "users";
        query = { _id: authorId };
        authorFollowAmount = postAuthor.numOfFollowers;
        arrayChanges = { $addToSet: { followedBy: userId } };
        numberChanges = { $set: { numOfFollowers: authorFollowAmount + 1 } };

        // adding the author's Id the the followingById array in the user

        const newArrayOfFollowingById = {
          $addToSet: { followingById: authorId },
        };

        await db
          .collection("users")
          .updateOne(userQuery, newArrayOfFollowingById);

        break;

      case "unfollow":
        const newArrayOfFollowIds = postAuthor.followedBy.filter((id) => {
          return id !== userId;
        });
        targetCollection = "users";
        query = { _id: authorId };
        authorFollowAmount = postAuthor.numOfFollowers;
        arrayChanges = { $set: { followedBy: newArrayOfFollowIds } };
        numberChanges = { $set: { numOfFollowers: authorFollowAmount - 1 } };

        const newFilteredArray = arrayOfIds.filter((id) => {
          return id !== authorId;
        });
        const filteredArrayOfFollowingById = {
          $set: { followingById: newFilteredArray },
        };

        await db
          .collection("users")
          .updateOne(userQuery, filteredArrayOfFollowingById);

        break;
    }

    const newArrayValue = arrayChanges;
    const newNumberValue = numberChanges;
    await db.collection(targetCollection).updateOne(query, newArrayValue);
    await db.collection(targetCollection).updateOne(query, newNumberValue);

    res
      .status(200)
      .json({ status: 200, data: reason, message: `successfully ${reason}` });
  } catch (err) {
    res.status(404).json({
      status: 404,
      data: "",
      message: err.message,
    });
  }

  client.close();
  console.log("disconnected");
};

const deletePost = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { postId } = req.params;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const result = await db.collection("newsFeed").deleteOne({ _id: postId });

    assert.strictEqual(1, result.deletedCount);

    result
      ? res.status(200).json({
          status: 200,
          data: result.deletedCount,
          message: "successfully deleted post.",
        })
      : res.status(404).json({
          status: 404,
          data: postId,
          message: "did not find post at given Id",
        });
  } catch (err) {
    res.status(404).json({
      status: 404,
      data: postId,
      message: "could not find post at given id",
      Error: err.message,
    });
  }
};

const getPostById = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { postId } = req.params;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const result = await db.collection("newsFeed").findOne({ _id: postId });

    result
      ? res
          .status(200)
          .json({ status: 200, data: result, message: "found post." })
      : res.status(404).json({
          status: 404,
          data: postId,
          message: "did not find post at given Id",
        });
  } catch (err) {
    res.status(404).json({ status: 404, data: postId, message: err.message });
  }

  client.close();
  console.log("disconnected");
};

const getNewsFeed = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const result = await db.collection("newsFeed").find().toArray();

    res
      .status(200)
      .json({ status: 200, data: result, message: "fetched newsFeed" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const getPostsByUserId = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { userId } = req.params;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const authorId = userId;
    const result = await db
      .collection("newsFeed")
      .find({ "author.authorId": userId })
      .toArray();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "fetched all posts by given Id",
        })
      : res.status(200).json({
          status: 200,
          data: "no posts",
          message: "no posts found at given Id",
        });
  } catch (err) {
    res.status(404).json({
      status: 404,
      data: userId,
      message: err.message,
    });
  }
  client.close();
  console.log("disconnected");
};

module.exports = {
  createPost,
  editPost,
  changePost,
  deletePost,
  getPostById,
  getNewsFeed,
  getPostsByUserId,
};
