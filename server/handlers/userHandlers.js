const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const uuidv4 = require("uuid").v4;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// creating a new user.
const createNewUser = async (req, res) => {
  //creating client
  const client = await MongoClient(MONGO_URI, options);
  //deconstruction everything we get from the front end
  const {
    name,
    lastName,
    userName,
    avatarSrc,
    bannerSrc,
    email,
    password,
    bio,
  } = req.body;

  await client.connect();
  console.log("conencted");

  try {
    const joined = new Date().toISOString();
    const _id = uuidv4();
    const User = {
      _id,
      name,
      lastName,
      userName,
      avatarSrc,
      bannerSrc,
      email,
      password,
      joined,
      bio,
      followedBy: [],
      numOfFollowers: 0,
      numOfLikes: 0,
      hasCookBook: false,
      cookBook: null,
    };
    const db = client.db("recipe-app");
    const result = await db.collection("users").insertOne({ ...User });

    assert.strictEqual(1, result.insertedCount);

    res
      .status(201)
      .json({ status: 201, data: User, message: "added new sucessfully" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }

  client.close();
  console.log("disconnected");
};

const deleteUserProfile = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { userId } = req.params;

  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const result = await db.collection("users").deleteOne({ _id: userId });
    assert.strictEqual(1, result.deletedCount);
    res.status(200).json({
      status: 200,
      data: result.deletedCount,
      message: "successfully deleted Account",
    });
  } catch (err) {
    res.status(404).json({ status: 404, data: userId, message: err.message });
  }
};

const editUserProfile = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { userId } = req.params;

  await client.connect();
  console.log("connected");

  try {
    const db = client.db("recipe-app");
    const query = { _id: userId };
    const newValue = { $set: req.body };
    const result = await db.collection("users").updateOne(query, newValue);

    assert.strictEqual(1, result.modifiedCount);
    res
      .status(202)
      .json({ status: 202, data: newValue, message: "made given changes!" });
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

// getting user by id.
const getUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { userId } = req.params;
  await client.connect();
  console.log("connected");

  try {
    const db = client.db("recipe-app");
    const result = await db.collection("users").findOne({ _id: userId });

    res
      .status(200)
      .json({ status: 200, data: result, message: "retrieved user" });
  } catch (err) {
    res.status(404).json({ status: 404, data: userId, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const LoginUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { email, password } = req.query;
  console.log(email, password);

  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const result = await db.collection("users").findOne({ email, password });

    result
      ? res
          .status(200)
          .json({ status: 200, data: result, message: "Logged in user" })
      : res
          .status(404)
          .json({ status: 404, data: result, message: "User not found" });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: { email, password }, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

module.exports = {
  createNewUser,
  deleteUserProfile,
  editUserProfile,
  getUser,
  LoginUser,
};
