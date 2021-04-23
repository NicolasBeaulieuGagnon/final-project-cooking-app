import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import ActionBar from "./ActionBar";
import cookBook from "../../assets/designIcons/cookbook.png";
import CreateComment from "./CreateComment";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";

// a more detailed post view with the comment section already opened.
// accessed by clicking the top half of any post or the number of comments.
const PostDetails = () => {
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState();
  const [openCommentSection, setOpenCommentSection] = useState(true);
  const [commentsArray, setCommentsArray] = useState([]);

  const { loggedInUser } = useContext(LoggedInUserContext);

  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      fetch(`/posts/post/${postId}`).then((res) => {
        res.json().then((data) => {
          setPost(data.data);
          setCommentsArray([...data.data.comments.reverse()]);
        });
      });
    }
  }, []);
  return (
    <BorderAroundWrapper>
      <Wrapper>
        {post.author && (
          <>
            <UserInfoWrapper>
              {post.author.hasCookBook && (
                <StyledLink to={`/cookbook/${post.author.cookBook}`}>
                  <CookBookImage src={cookBook} />
                </StyledLink>
              )}
              <AvatarWrapper>
                <StyledLink to={`/profile/${post.author.authorId}`}>
                  <Avatar src={post.author.authorAvatarSrc} />
                </StyledLink>
              </AvatarWrapper>
              <StyledLink to={`/profile/${post.author.authorId}`}>
                <Handle>{post.author.handle}</Handle>
              </StyledLink>
              <PostedTime>
                posted: {moment(post.posted).format("ll")}
              </PostedTime>
            </UserInfoWrapper>
            <PostMessage> {post.post} </PostMessage>
            {post.postImage && <PostImg src={post.postImage} />}
            <ActionBar
              authorId={post.author.authorId}
              arrayOfIds={post.likedBy}
              postId={post._id}
              numFollows={post.numFollows}
              numLikes={post.numLikes}
              likedBy={post.likedBy}
              comments={post.comments}
              openCommentSection={openCommentSection}
              setOpenCommentSection={setOpenCommentSection}
            />
            {openCommentSection && (
              <CreateComment
                commentsArray={commentsArray}
                setCommentsArray={setCommentsArray}
                loggedInUser={loggedInUser}
                postId={post._id}
              />
            )}
          </>
        )}
      </Wrapper>
    </BorderAroundWrapper>
  );
};

const BorderAroundWrapper = styled.div`
  padding-bottom: 30px;
`;

const UserInfoWrapper = styled.div`
  background: transparent;
  position: relative;
`;

const PostedTime = styled.div`
  background: transparent;
  margin-left: 10px;
  margin-top: 4px;
  font-size: 15px;
  font-style: italic;
  opacity: 0.8;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--dropDown-bg-color);
  border: 2px solid var(--dark-accent);
  margin: 15px 10px;
  border-radius: 50%;
  width: 90px;
  height: 90px;
`;
const Avatar = styled.img`
  width: 100%;
  height: auto;
`;

const Handle = styled.div`
  background: var(--dropDown-bg-color);
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid var(--primary-border-color);
  position: absolute;
  top: 65px;
  left: 60px;
  font-size: 24px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  box-shadow: 0 0 4px 1px #c7c5c3;
  padding: 5px 20px;
  border-radius: 5px;
  margin: 30px 40px;
  min-width: 200px;
  max-width: 800px;
  min-height: 230px;
  position: relative;
  background: var(--post-bg-color);
  margin-bottom: 30px;
`;

const CookBookImage = styled.img`
  width: 70px;
  position: absolute;
  top: -10px;
  left: 115px;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const PostMessage = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 35px;
  margin-top: 20px;
  background: var(--post-bg-color);
`;

const PostImg = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 5px 1px var(--dark-accent);
  margin-top: 10px;
  margin-left: 5%;
  width: 70%;
  border: 1px solid var(--dark-accent);
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 5px;
  margin: 3px 0;
`;

export default PostDetails;
