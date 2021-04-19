import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import moment from "moment";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import NotStyledButton from "../Button/NoStyledButton";
import { HiOutlinePlusCircle } from "react-icons/hi";
import ProfilePosts from "./ProfilePosts";
import ProfileCookBook from "./ProfileCookBook";
import ProfileFollowers from "./ProfileFollowers";
import MainStyledButton from "../Button/MainStyledButton";
import NewAvatarModal from "../Modals/NewAvatarModal";

const Profile = () => {
  const [panelContent, setPanelContent] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userCookBook, setUserCookBook] = useState(null);
  const { loggedInUser, updatingUser, setUpdatingUser } = useContext(
    LoggedInUserContext
  );
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

  const handleChangeAvatar = () => {
    const avatarModalBg = document.getElementById("avatarChangeModalBg");
    const avatarModal = document.getElementById("avatarChangeModal");
    avatarModalBg.style.opacity = "1";
    avatarModalBg.style.visibility = "visible";
    avatarModal.style.top = "50%";
  };

  const ClickUploadInput = () => {
    document.getElementById("uploadBannerInput").click();
  };

  const handleUploadBanner = (ev) => {
    console.log(ev.target.files[0]);

    fetch(`/s3Url`).then((res) => {
      res.json().then((data) => {
        const secretUrl = data.url;
        const file = ev.target.files[0];
        const image = secretUrl.split("?")[0];

        fetch(secretUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        });

        fetch(`/users/user/${loggedInUser._id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bannerSrc: image }),
        }).then(() => {
          setUpdatingUser(!updatingUser);
        });
      });
    });
  };
  return (
    <>
      <NewAvatarModal
        updatingUser={updatingUser}
        setUpdatingUser={setUpdatingUser}
        loggedInUser={loggedInUser}
      />
      <Wrapper>
        <UploadBannerInput
          id="uploadBannerInput"
          onChange={handleUploadBanner}
          type="file"
        />
        {userId === ":userId" ? (
          userInfo.bannerSrc === "" ? (
            <AddBannerButton onClick={ClickUploadInput}>
              <HiOutlinePlusCircle size="70" />
            </AddBannerButton>
          ) : (
            <>
              <EditBannerButton onClick={ClickUploadInput}>
                <HiOutlinePlusCircle size="40" />
              </EditBannerButton>
              <ImageBannerWrapper>
                <Banner src={userInfo.bannerSrc} />
              </ImageBannerWrapper>
            </>
          )
        ) : userInfo.bannerSrc === "" ? (
          <ReplaceBanner></ReplaceBanner>
        ) : (
          <ImageBannerWrapper>
            <Banner src={userInfo.bannerSrc} />
          </ImageBannerWrapper>
        )}

        {userId === ":userId" ? (
          <EditAvatarButton onClick={handleChangeAvatar}>
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
              <PanelButton
                onClick={() => {
                  handlePanelChange("cookbook");
                  document.body.scrollTop = 1000;
                  document.documentElement.scrollTop = 1000;
                }}
              >
                Cookbook
              </PanelButton>
              <PanelButton
                onClick={() => {
                  handlePanelChange("posts");
                  document.body.scrollTop = 1000;
                  document.documentElement.scrollTop = 1000;
                }}
              >
                Posts
              </PanelButton>
              <PanelButton
                onClick={() => {
                  handlePanelChange("following");
                  document.body.scrollTop = 1000;
                  document.documentElement.scrollTop = 1000;
                }}
              >
                Following
              </PanelButton>
            </ButtonsWrapper>
          </LeftFadingBorder>
        </FadingBorder>
        <Panel id="panelId">
          {panelContent && panelContent === "cookbook" ? (
            <ProfileCookBook user={userInfo.userName} cookBook={userCookBook} />
          ) : panelContent === "posts" ? (
            <ProfilePosts user={userInfo.userName} posts={userPosts} />
          ) : panelContent === "following" ? (
            <ProfileFollowers
              user={userInfo.userName}
              following={userInfo.followingById}
            />
          ) : (
            <div></div>
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

const ReplaceBanner = styled.div`
  position: relative;
  z-index: 1;
  background: var(--dropDown-bg-color);
  border-bottom: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  height: 130px;
  width: 100%;
`;

const UploadBannerInput = styled.input`
  top: 0;
  left: 0;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -200;
`;

const ProfileWrapper = styled.div`
  padding-left: 20px;
  padding-top: 20px;
  background: var(--primary-bg-color);
  width: 200px;
  height: 372px;
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
const EditBannerButton = styled(AddBannerButton)`
  color: white;
  opacity: 1;
  top: 10px;
  left: 30px;
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
  background-color: transparent;
`;
const Avatar = styled.img`
  height: auto;
  width: 100%;
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
  width: 90vw;
  height: 70px;
  display: flex;
  justify-content: flex-start;
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

const PanelButton = styled(MainStyledButton)`
  position: relative;
  margin-bottom: 20px;
  &:hover {
    transform: translate(0, -2%);
    padding-bottom: 18px;
    text-shadow: 2px 2px white;
  }
`;

const Wrapper = styled.div`
  background: transparent;
  position: relative;
`;

export default Profile;
