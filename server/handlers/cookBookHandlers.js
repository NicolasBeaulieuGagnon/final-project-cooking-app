const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const uuidv4 = require("uuid").v4;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCookBook = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { cookbookId } = req.params;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");
  try {
    const result = await db
      .collection("cookbooks")
      .findOne({ _id: cookbookId });

    res.status(200).json({
      status: 200,
      data: result,
      message: "retreived cookbook",
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: cookbookId, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const createCookBook = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { userId, handle } = req.body;
  await client.connect();
  console.log("connected");

  const db = client.db("recipe-app");

  try {
    const _id = uuidv4();
    const cookBook = {
      author: handle,
      authorId: userId,
      recipes: [],
    };
    const newCookBook = {
      _id,
      cookBook,
    };
    const result = await db
      .collection("cookbooks")
      .insertOne({ ...newCookBook });

    assert.strictEqual(1, result.insertedCount);

    res.status(202).json({
      status: 202,
      data: newCookBook,
      message: `created ${handle}'s cookbook!`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, data: { userId, handle }, message: err.message });
  }
  client.close();
  console.log("disconnnected");
};

const editCookBook = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { cookbookId } = req.params;

  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");

  try {
    const query = { _id: cookbookId };
    const newValue = { $set: req.body };
    const result = await db.collection("cookbooks").updateOne(query, newValue);

    assert.strictEqual(1, result.modifiedCount);

    res.status(202).json({
      status: 202,
      data: newValue,
      message: "made changes to cookbook!",
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, data: "something", message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const deleteCookBook = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { cookbookId } = req.params;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");
  try {
    const result = await db
      .collection("cookbooks")
      .deleteOne({ _id: cookbookId });
    assert.strictEqual(1, result.deletedCount);

    res.status(200).json({
      status: 200,
      data: result.deletedCount,
      message: "successfully deleted cookbook",
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: cookbookId, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

module.exports = {
  getCookBook,
  createCookBook,
  editCookBook,
  deleteCookBook,
};
