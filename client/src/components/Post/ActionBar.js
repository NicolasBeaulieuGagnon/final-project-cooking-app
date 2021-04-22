import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { GrBook } from "react-icons/gr";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import LikeButton from "../Button/LikeButton/LikeButton";
import CommentButton from "../Button/CommentButton/CommentButton";
import FollowButton from "../Button/FollowButton/FollowButton";
import { Link } from "react-router-dom";

const ActionBar = ({
  openCommentSection,
  setOpenCommentSection,
  numLikes,
  likedBy,
  postId,
  authorId,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { loggedInUser, updatingUser, setUpdatingUser } = useContext(
    LoggedInUserContext
  );

  useEffect(() => {
    setPostLikes(numLikes);
  }, []);

  useEffect(() => {
    if (loggedInUser._id) {
      setIsLiked(checkData(postId, loggedInUser.postsLiked));
      setIsFollowed(checkData(authorId, loggedInUser.followingById));
    }
  }, [loggedInUser]);

  const checkData = (id, arrayOfIds) => {
    if (arrayOfIds.length > 0) {
      const check = arrayOfIds.filter((likedId) => {
        return id === likedId;
      });
      if (check.length === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      const bodyObject = {
        reason: "unlike",
        userId: loggedInUser._id,
        postId,
        arrayOfIds: loggedInUser.postsLiked,
        authorId,
        numberAmount: postLikes,
      };
      fetch("/postInteraction", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bodyObject }),
      }).then((res) =>
        res.json().then((data) => {
          setPostLikes(postLikes - 1);
          setUpdatingUser(!updatingUser);
        })
      );
    } else {
      const bodyObject = {
        reason: "like",
        userId: loggedInUser._id,
        postId,
        authorId,
        numberAmount: postLikes,
      };
      fetch("/postInteraction", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bodyObject }),
      }).then((res) =>
        res.json().then((data) => {
          setPostLikes(postLikes + 1);
          setUpdatingUser(!updatingUser);
        })
      );
    }
  };

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    if (isFollowed) {
      const bodyObject = {
        reason: "unfollow",
        userId: loggedInUser._id,
        postId,
        authorId,
      };

      fetch("/postInteraction", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bodyObject }),
      }).then((res) =>
        res.json().then(() => {
          setUpdatingUser(!updatingUser);
        })
      );
    } else {
      const bodyObject = {
        reason: "follow",
        userId: loggedInUser._id,
        postId,
        authorId,
      };

      fetch("/postInteraction", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bodyObject }),
      }).then((res) =>
        res.json().then(() => {
          setUpdatingUser(!updatingUser);
        })
      );
    }
  };

  const handleOpenComments = () => {
    setOpenCommentSection(!openCommentSection);

    if (!openCommentSection) {
      setAnimate(!animate);
      setTimeout(() => {
        setAnimate(false);
      }, 1200);
    }
  };

  return (
    <>
      <Wrapper>
        <Span>
          <LikeButton onClick={handleLike} isLiked={isLiked} />
          <NumberDiv id={`likesNumberId-${postId}`}>{postLikes}</NumberDiv>
        </Span>
        <Span>
          <FollowButton onClick={handleFollow} isFollowed={isFollowed} />
        </Span>
        <Span>
          <CommentButton
            animate={animate}
            onClick={handleOpenComments}
            openCommentSection={openCommentSection}
          />
          <CommentsNumberDiv id="commentsNumber">
            <StyledLink to={`/post/${postId}`}>{comments.length}</StyledLink>
          </CommentsNumberDiv>
        </Span>
      </Wrapper>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const NumberDiv = styled.div`
  background: transparent;
  font-weight: bold;
  font-size: 19px;
  margin-top: 10px;
  transition: 0.2s ease-in-out;
`;

const CommentsNumberDiv = styled(NumberDiv)`
  margin-top: 7px;
`;
const Span = styled.span`
  display: flex;

  background: transparent;
`;
const Wrapper = styled.div`
  background: transparent;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DisabledFollowButton = styled.div`
  opacity: 0.5;
  background: transparent;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

export default ActionBar;
