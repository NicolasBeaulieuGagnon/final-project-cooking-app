import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import moment from "moment";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import NotStyledButton from "../Button/NoStyledButton";
import { HiOutlinePlusCircle } from "react-icons/hi";
import ProfilePosts from "./ProfilePosts";
import ProfileCookBook from "./ProfileCookBook";
import MainStyledButton from "../Button/MainStyledButton";

const Profile = () => {
  const [panelContent, setPanelContent] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userCookBook, setUserCookBook] = useState(null);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { userId } = useParams();

  useEffect(() => {
    setPanelContent(null);
    if (panelContent && panelContent === null) {
      const panelHeight = document.getElementById("panelId");
      panelHeight.style.height = "0px";
    }
    if (userId === ":userId") {
      setUserInfo(loggedInUser);
      fetch(`/posts/${loggedInUser._id}`).then((res) => {
        res.json().then((data) => {
          if (data.data === "no posts") {
            setUserPosts(null);
          } else {
            setUserPosts(data.data);
          }
        });
      });
    } else {
      fetch(`/users/user/${userId}`).then((res) => {
        res.json().then((data) => {
          let fetchedUser = data.data;
          setUserInfo(fetchedUser);

          fetch(`/posts/${fetchedUser._id}`).then((res) => {
            res.json().then((data) => {
              if (data.status === "no posts") {
                setUserPosts(null);
              } else {
                setUserPosts(data.data);
              }
            });
          });
        });
      });
    }
  }, [loggedInUser, userId]);

  useEffect(() => {
    if (userInfo.hasCookBook) {
      fetch(`/cookbook/${userInfo.cookBook}`).then((res) => {
        res.json().then((data) => {
          console.log(data);
          setUserCookBook(data.data);
        });
      });
    }
  }, [userInfo]);
  const handlePanelChange = (panelChoice) => {
    setPanelContent(panelChoice);
    const panelHeight = document.getElementById("panelId");
    panelHeight.style.height = "auto";
  };
  return (
    <>
      <Wrapper>
        {userInfo.bannerSrc === "" && userId === ":userId" && (
          <AddBannerButton>
            <HiOutlinePlusCircle size="70" />
          </AddBannerButton>
        )}
        {userInfo.bannerSrc === "" ? (
          <ReplaceBanner />
        ) : (
          <ImageBannerWrapper>
            <Banner src={userInfo.bannerSrc} />
          </ImageBannerWrapper>
        )}
        {userId === ":userId" ? (
          <EditAvatarButton>
            <EditableAvatar src={userInfo.avatarSrc} alt="userAvatar" />
          </EditAvatarButton>
        ) : (
          <AvatarWrapper>
            <Avatar src={userInfo.avatarSrc} alt="userAvatar" />
          </AvatarWrapper>
        )}

        <FadingBorder>
          <LeftFadingBorder>
            <ProfileWrapper>
              <Name>{userInfo.userName}</Name>
              <StatsWrapper>
                <StatWrapper>
                  Joined: <Stat>{moment(userInfo.joined).format("LL")}</Stat>
                </StatWrapper>
                <StatWrapper>
                  Followers: <Stat>{userInfo.numOfFollowers}</Stat>
                </StatWrapper>
                <StatWrapper>
                  Likes: <Stat>{userInfo.numOfLikes}</Stat>
                </StatWrapper>
              </StatsWrapper>
              <Name>Bio:</Name>
              {userInfo.bio === "" ? (
                <Bio>
                  Nothing for now. But we're sure {userInfo.userName} is cooking
                  up something great!
                </Bio>
              ) : (
                <Bio>{userInfo.bio} </Bio>
              )}
            </ProfileWrapper>
            <ButtonsWrapper>
              <CookBookButton
                onClick={() => {
                  handlePanelChange("cookbook");
                  document.body.scrollTop = 500;
                  document.documentElement.scrollTop = 500;
                }}
              >
                Cookbook
              </CookBookButton>
              <PostsButton
                onClick={() => {
                  handlePanelChange("posts");
                  document.body.scrollTop = 1000;
                  document.documentElement.scrollTop = 1000;
                }}
              >
                Posts
              </PostsButton>
            </ButtonsWrapper>
          </LeftFadingBorder>
        </FadingBorder>
        <Panel id="panelId">
          {panelContent && panelContent === "cookbook" ? (
            <ProfileCookBook user={userInfo.userName} cookBook={userCookBook} />
          ) : (
            <ProfilePosts user={userInfo.userName} posts={userPosts} />
          )}
        </Panel>
      </Wrapper>
    </>
  );
};

const Panel = styled.div`
  box-shadow: 0 -5px 20px 0.1px var(--btn-bg-color);
  position: relative;
  top: 500px;
  background: var(--primary-bg-color);
  height: 0;
  border-top: 3px solid var(--dark-accent);
  overflow-y: scroll;
  transition: 0.5s ease-in;
`;
const ProfileWrapper = styled.div`
  padding-left: 20px;
  padding-top: 20px;
  background: var(--primary-bg-color);
  width: 200px;
  height: 400px;
`;

const Name = styled.div`
  background: var(--primary-bg-color);
  font-size: 30px;
  font-weight: bold;
`;
const StatWrapper = styled.div`
  padding-top: 5px;
  background: var(--primary-bg-color);
`;
const FadingBorder = styled.div`
  border-top-left-radius: 5px;
  width: 60%;
  height: 0;
  margin-top: 70px;
  margin-left: 10px;
  padding-top: 10px;
  background: var(--primary-bg-color);
  background: linear-gradient(
    to right,
    var(--primary-border-color),
    var(--primary-bg-color)
  );
  position: absolute;
`;
const LeftFadingBorder = styled.div`
  width: 0;
  height: 300px;
  padding-left: 10px;
  background: var(--primary-bg-color);
  background: linear-gradient(
    to bottom,
    var(--primary-border-color),
    var(--primary-bg-color)
  );
  position: absolute;
`;

const Stat = styled.span`
  opacity: 0.6;
  background: var(--primary-bg-color);
  font-weight: normal;
  font-style: italic;
`;

const ImageBannerWrapper = styled.div`
  position: relative;
  border-bottom: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 100%;
`;
const Banner = styled.img`
  position: relative;
  z-index: 1;
  background: #e8d7be;
  border-bottom: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  height: auto;
  width: 100%;
`;

const ReplaceBanner = styled.div`
  position: relative;
  z-index: 1;
  background: var(--primary-bg-color);
  border-bottom: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  height: 130px;
  width: 100%;
`;
const AddBannerButton = styled(NotStyledButton)`
  z-index: 2;
  opacity: 0.4;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 30px;
  transition: 0.1s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: translate(-50%) scale(0.8);
  }
`;
const AvatarWrapper = styled.div`
  z-index: 10;
  border: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  position: absolute;
  left: 25px;
  top: 100px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dropDown-bg-color);
`;
const Avatar = styled.img`
  height: 100%;
  width: auto;
`;
const Bio = styled.div`
  margin-top: 10px;
  padding: 5px 10px;
  font-weight: bold;
  opacity: 0.7;
  border-radius: 5px;
  background-color: var(--primary-bg-color);
  box-shadow: 0.9px 0.9px 6px 1px #c9c9c9;
  width: 328px;
  height: 100px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    background: rgb(232, 215, 190, 0.7);
  }
`;

const StatsWrapper = styled.div`
  font-size: 19px;
  font-weight: bold;
`;

const ButtonsWrapper = styled.div`
  position: relative;
  width: 350px;
`;

const EditableAvatar = styled(Avatar)`
  transition: 0.2s ease-in-out;
  :hover {
    transform: rotate(-5deg) scale(1.1);
    opacity: 0.6;
  }
  :active {
    transform: rotate(5deg) scale(0.9);
  }
`;

const EditAvatarButton = styled(NotStyledButton)`
  z-index: 10;
  border: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  position: absolute;
  left: 25px;
  top: 100px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dropDown-bg-color);
`;

const CookBookButton = styled(MainStyledButton)`
  bottom: -23px;
  padding: 10px 25px;
  transition: 0.1s ease-in-out;
  box-shadow: 0 -5px 20px 0.1px var(--btn-bg-color);
  &:active {
    padding-top: 40px;
    bottom: -30px;
  }
`;
const PostsButton = styled(CookBookButton)`
  padding: 10px 43px;
  right: 2px;
`;
const Wrapper = styled.div`
  background: transparent;
  position: relative;
`;

export default Profile;
