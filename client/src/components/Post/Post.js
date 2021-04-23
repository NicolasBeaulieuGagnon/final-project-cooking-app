import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import ActionBar from "./ActionBar";
import AuthorPostInfo from "./AuthorPostInfo";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import MainStyledButton from "../Button/MainStyledButton";
import CreateComment from "./CreateComment";
import { Link } from "react-router-dom";

// each post is being received from the NewsFeed.js or the ProfilePosts.js
const Post = ({ givenPost, index }) => {
  const [isEditing, setIsEditing] = useState();
  const [openCommentSection, setOpenCommentSection] = useState(false);
  const [commentsArray, setCommentsArray] = useState([]);

  const { loggedInUser } = useContext(LoggedInUserContext);
  const { author, edited, post, postImage, posted, _id } = givenPost;

  // checks to see if the givenPost has any comments attached to it
  // and gives them to commentsArray. this useState is used in the CreateComment.js
  useEffect(() => {
    if (givenPost.comments) {
      setCommentsArray(givenPost.comments);
    }
  }, []);

  // little aesthetic to have the cascading post entrances.
  useEffect(() => {
    const postEntrance = document.getElementById(_id);
    setTimeout(() => {
      setTimeout(() => {
        postEntrance.style.transform = "translate(40%)";
        setTimeout(() => {
          postEntrance.style.transform = "translate(0%)";
        }, 300);
      }, 300);
    }, index * 100);
  }, [givenPost]);

  // opens up the editable post only if you are that posts author
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Wrapper key={_id} id={_id}>
      <StyledLink to={`/post/${givenPost._id}`}>
        <AuthorPostInfo author={author} posted={posted} />
      </StyledLink>
      {edited && <Edited>edited post</Edited>}
      <Border />
      {isEditing ? (
        <>
          <EditingPostMessage placeholder={post} />
          <RemovePostButton>x</RemovePostButton>
          <SubmitEditButton>Submit</SubmitEditButton>
        </>
      ) : (
        <PostMessage> {post} </PostMessage>
      )}

      <ActionBarWrapper>
        {postImage === "" ? <div></div> : <PostImg src={postImage} />}
        {localStorage.getItem("logged in") === "true" && (
          <ActionBar
            authorId={givenPost.author.authorId}
            arrayOfIds={givenPost.likedBy}
            postId={givenPost._id}
            numFollows={givenPost.numFollows}
            numLikes={givenPost.numLikes}
            likedBy={givenPost.likedBy}
            comments={givenPost.comments}
            openCommentSection={openCommentSection}
            setOpenCommentSection={setOpenCommentSection}
          />
        )}
      </ActionBarWrapper>
      {author.authorId === loggedInUser._id && (
        <EditPostButton onClick={handleEdit}>Edit </EditPostButton>
      )}
      {openCommentSection && (
        <CreateComment
          commentsArray={commentsArray}
          setCommentsArray={setCommentsArray}
          loggedInUser={loggedInUser}
          postId={givenPost._id}
        />
      )}
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const ActionBarWrapper = styled.div`
  display: flex;
  background: transparent;
`;

const EditingPostMessage = styled.textarea`
  border-radius: 5px;
  font-weight: bold;
  font-size: 17px;
  margin-left: 35px;
  margin-top: 20px;
  width: 300px;
  height: 70px;
  resize: none;
  outline: none;
  border: none;
`;

const RemovePostButton = styled.button`
  top: 5px;
  right: 5px;
  outline: none;
  cursor: pointer;
  position: absolute;
  border-radius: 2px;
  padding: 2px 10px;
  box-shadow: 1px 1px 6px 0.1px var(--primar-border-color);
  border: 2px solid var(--primary-border-color);
  background: var(--btn-bg-color);
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const SubmitEditButton = styled(RemovePostButton)`
  top: 224px;
  left: 279px;
`;

const EditPostButton = styled(MainStyledButton)`
  padding-left: 5px;
  padding-right: 5px;
  font-size: 13px;
  opacity: 0.5;
  border-radius: 2px;
  bottom: 0px;
  left: -10px;
  &:hover {
    opacity: 1;
  }
`;
const Edited = styled.span`
  opacity: 0.6;
  position: absolute;
  background: var(--post-bg-color);
  top: 72px;
  left: 120px;
  font-style: italic;
`;

const PostImg = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 5px 1px var(--dark-accent);
  margin-top: 10px;
  margin-left: 5%;
  width: 70%;
  border: 1px solid var(--dark-accent);
`;

const PostMessage = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 35px;
  margin-top: 20px;
  background: var(--post-bg-color);
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 5px;
  margin: 3px 0;
`;

const Wrapper = styled.div`
  box-shadow: 0 0 4px 1px #c7c5c3;
  padding: 5px 20px;
  border-radius: 5px;
  margin: 10px 40px;
  min-width: 200px;
  max-width: 800px;
  min-height: 230px;
  position: relative;
  transform: translate(-200%);
  background: var(--post-bg-color);
  transition: 0.3s ease-in-out;
`;
export default Post;
