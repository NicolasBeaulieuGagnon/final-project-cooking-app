import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { GrBook } from "react-icons/gr";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import LikeButton from "../Button/LikeButton/LikeButton";
import CommentButton from "../Button/CommentButton/CommentButton";
import FollowButton from "../Button/FollowButton/FollowButton";

const ActionBar = ({ numLikes, likedBy, postId, arrayOfIds, authorId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const { loggedInUser, updatingUser, setUpdatingUser } = useContext(
    LoggedInUserContext
  );

  useEffect(() => {
    setPostLikes(numLikes);
  }, []);

  useEffect(() => {
    if (loggedInUser._id) {
      setIsLiked(checkData(loggedInUser._id, likedBy));
      setIsFollowed(checkData(authorId, loggedInUser.followingById));
    }
  }, [loggedInUser, likedBy]);

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
    if (isLiked === false) {
      const bodyObject = {
        reason: "like",
        userId: loggedInUser._id,
        postId,
        arrayOfIds,
        authorId,
        numberAmount: numLikes,
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
          console.log(data.message);
          setPostLikes(postLikes + 1);
        })
      );
    } else if (isLiked === true) {
      const bodyObject = {
        reason: "unlike",
        userId: loggedInUser._id,
        postId,
        arrayOfIds,
        numberAmount: numLikes,
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
          console.log(data.message);
          setPostLikes(postLikes - 1);
        })
      );
    }
  };

  const handleFollow = () => {
    setIsFollowed(!isFollowed);

    if (isFollowed === false) {
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
    } else if (isFollowed === true) {
      const bodyObject = {
        reason: "unfollow",
        userId: loggedInUser._id,
        postId,
        authorId,

        arrayOfIds: loggedInUser.followingById,
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

  return (
    <>
      <Wrapper>
        {postLikes}
        <LikeButton onClick={handleLike} isLiked={isLiked} />
        {loggedInUser?.hasCookBook ? (
          <>
            <FollowButton onClick={handleFollow} isFollowed={isFollowed} />
          </>
        ) : (
          <DisabledFollowButton>
            <GrBook size="20" />
          </DisabledFollowButton>
        )}

        <CommentButton />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background: transparent;
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
`;

const DisabledFollowButton = styled.div`
  opacity: 0.5;
  background: transparent;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

export default ActionBar;
