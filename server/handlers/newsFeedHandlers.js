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
      numFollows: 0,
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
  deletePost,
  getPostById,
  getNewsFeed,
  getPostsByUserId,
};
