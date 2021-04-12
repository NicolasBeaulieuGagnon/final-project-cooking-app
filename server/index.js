const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {
  createNewUser,
  deleteUserProfile,
  editUserProfile,
  getUser,
  LoginUser,
} = require("./handlers/userHandlers");

const {
  createPost,
  editPost,
  deletePost,
  getPostById,
  getNewsFeed,
  getPostsByUserId,
} = require("./handlers/newsFeedHandlers");

const {
  getCookBook,
  createCookBook,
  editCookBook,
  deleteCookBook,
  // getRecipeByFilters,
  getApiKey,
} = require("./handlers/cookBookHandlers");

const { getSecureLink } = require("./handlers/userAvatarHandlers");

const { getAllQuestions } = require("./handlers/questionHandler");

const PORT = 31415;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // newsfeed endpoints we need

  // GET whole news feed
  .get("/newsFeed", getNewsFeed)
  // GET all posts posted by user
  .get("/posts/:userId", getPostsByUserId)
  // GET single post
  .get("/posts/post/:postId", getPostById)
  // POST new post
  .post("/posts/post", createPost)
  // PATCH edit post posted by user
  .patch("/posts/post/:postId", editPost)
  // DELETE remove post posted by user
  .delete("/posts/post/:postId", deletePost)

  // CookBook endpoints we need

  // GET user COOKBOOK
  .get("/cookbook/:cookbookId", getCookBook)
  // POST new cookbook by user id
  .post("/cookbook", createCookBook)
  // PATCH edit user's cookbook
  .patch("/cookbook/:cookbookId", editCookBook)
  // DELETE remove cookbook made by user
  .delete("/cookbook/:cookbookId", deleteCookBook)

  // user endpoints we need

  //GET user login
  .get("/users/login", LoginUser)
  // GET user
  .get("/users/user/:userId", getUser)
  // PATCH edit user
  .patch("/users/user/:userId", editUserProfile)
  // DELETE delete user.
  .delete("/users/user/delete/:userId", deleteUserProfile)
  // POST new user
  .post("/users/user", createNewUser)

  // get secure url from our server to be able to post image to s3 bucket
  .get("/s3Url", getSecureLink)

  //getting all questions stored in a JSON
  .get("/questions", getAllQuestions)

  //GET SPOON API KEY
  .get("/apiKey", getApiKey)
  // .put("/recipe", getRecipeByFilters)

  .listen(PORT, function () {
    console.info("🌍 Listening on port ", PORT);
  });
