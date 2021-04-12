const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, SPOON_API_KEY } = process.env;
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

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "retreived cookbook",
        })
      : res.status(404).json({
          status: 404,
          data: cookbookId,
          message: "cookbook not found",
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
    };
    const recipes = [];
    const newCookBook = {
      _id,
      cookBook,
      recipes,
    };
    const result = await db
      .collection("cookbooks")
      .insertOne({ ...newCookBook });

    assert.strictEqual(1, result.insertedCount);
    // once the cookbook is created, go to that user and turn hasCookBook to true;
    // and set cookBook to that cookbook's id
    const query = { _id: userId };

    const newValue = { $set: { hasCookBook: true, cookBook: _id } };

    const changedUserInfo = await db
      .collection("users")
      .updateOne(query, newValue);

    assert.strictEqual(1, changedUserInfo.modifiedCount);

    res.status(202).json({
      status: 202,
      data: { newCookBook, newValue },
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
      .json({ status: 400, data: "Book not found", message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const deleteCookBook = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { cookbookId } = req.params;
  const { userId } = req.query;
  await client.connect();
  console.log("connected");
  const db = client.db("recipe-app");
  try {
    const result = await db
      .collection("cookbooks")
      .deleteOne({ _id: cookbookId });
    assert.strictEqual(1, result.deletedCount);
    // once book has been deleted than we set the user hasCookBook back to false
    // and the cookbook back to null,

    const query = { _id: userId };

    const newValue = { $set: { hasCookBook: false, cookBook: null } };

    const changedUserInfo = await db
      .collection("users")
      .updateOne(query, newValue);

    assert.strictEqual(1, changedUserInfo.modifiedCount);

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

const getApiKey = (req, res) => {
  res.status(200).json({ status: 200, data: SPOON_API_KEY });
};
// const getRecipeByFilters = (req, res) => {
//   const { filterOne, filterTwo, resultOne, resultTwo } = req.body;

//   fetch(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOON_API_KEY}&${filterOne}=${resultOne}`
//   ).then((res) => {
//     res.json().then((data) => {
//       console.log(data);
//     });
//   });
// };

module.exports = {
  getCookBook,
  createCookBook,
  editCookBook,
  deleteCookBook,
  getApiKey,
  // getRecipeByFilters,
};
