import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./Navbar/NavBar";
import Homepage from "./Homepage";
import Questions from "./Questions/Questions";
import Profile from "./Profile";
import LoginIn from "./LoginIn";
import About from "./About";
import InFridge from "./InFridge";
import { GlobalStyle } from "./GlobalStyle";
import CookBook from "./CookBook/CookBook";
import SubmitRecipe from "./CookBook/SubmitRecipe";
import Recipe from "./Recipe";
import NewsFeed from "./NewsFeed/NewsFeed";
import PostDetails from "./Post/PostDetails";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/questions">
              <Questions />
            </Route>
            <Route exact path="/profile/:userId">
              <Profile />
            </Route>
            <Route exact path="/login">
              <LoginIn />
            </Route>
            <Route exact path="/fridge">
              <InFridge />
            </Route>
            <Route exact path="/cookbook/:cookbookId">
              <CookBook />
            </Route>
            <Route exact path="/submitRecipe">
              <SubmitRecipe />
            </Route>
            <Route exact path="/recipe/:recipeId">
              <Recipe />
            </Route>
            <Route exact path="/newsFeed">
              <NewsFeed />
            </Route>
            <Route exact path="/post/:postId">
              <PostDetails />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;
export default App;
