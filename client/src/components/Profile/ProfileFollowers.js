import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrGroup, GrLike } from "react-icons/gr";

import cookBook from "../../assets/designIcons/cookbook.png";
import kitchen from "../../assets/designIcons/kitchen.png";

// the user's profile people they are following.
const ProfileFollowers = ({ user, following }) => {
  const [arrayOfFollowing, setArrayOfFollowing] = useState([]);

  useEffect(() => {
    setArrayOfFollowing([]);
    if (following) {
      following.forEach((follow) => {
        fetch(`/users/user/${follow}`).then((res) => {
          res.json().then((data) => {
            setArrayOfFollowing((arrayOfFollowing) => [
              ...arrayOfFollowing,
              data.data,
            ]);
          });
        });
      });
    }
  }, [following]);

  return (
    <Wrapper>
      <Title>Following</Title>
      <Border />
      {arrayOfFollowing.length > 0 ? (
        <>
          <FollowsWrapper>
            {arrayOfFollowing.map((follow) => {
              return (
                <FollowerWrapper>
                  {follow.bannerSrc === "" ? (
                    <EmptyBanner></EmptyBanner>
                  ) : (
                    <BannerWrapper>
                      <Banner src={follow.bannerSrc} />
                    </BannerWrapper>
                  )}

                  <StatsWrapper>
                    <StatNumber>
                      {follow.numOfLikes}{" "}
                      <Stat>
                        <GrLike size="22" />
                      </Stat>
                    </StatNumber>
                    <StatNumber>
                      {follow.numOfFollowers}{" "}
                      <Stat>
                        <GrGroup size="22" />
                      </Stat>
                    </StatNumber>
                  </StatsWrapper>
                  <ImageAndNameWrapper>
                    <StyledLink
                      onClick={() => {
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                      }}
                      to={`/profile/${follow._id}`}
                    >
                      <Name>{follow.userName}</Name>
                    </StyledLink>

                    {follow.hasCookBook && (
                      <StyledLink to={`/cookbook/${follow.cookBook}`}>
                        <Icon src={cookBook} />
                      </StyledLink>
                    )}
                    <AvatarWrapper>
                      <StyledLink
                        onClick={() => {
                          document.body.scrollTop = 0;
                          document.documentElement.scrollTop = 0;
                        }}
                        to={`/profile/${follow._id}`}
                      >
                        <Avatar src={follow.avatarSrc} />
                      </StyledLink>
                    </AvatarWrapper>
                  </ImageAndNameWrapper>
                </FollowerWrapper>
              );
            })}
          </FollowsWrapper>
        </>
      ) : (
        <EmptyWrapper>
          {user}'s not following anyone right now.
          <EmptyIcon src={kitchen} alt="empty kitchen" />
        </EmptyWrapper>
      )}
    </Wrapper>
  );
};

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 35px;
  margin-left: 5%;
  margin-top: 10px;
`;
const EmptyIcon = styled.img`
  margin: 30px;
  width: 150px;
  opacity: 0.8;
`;

const EmptyBanner = styled.div`
  position: absolute;
  background: var(--dropDown-bg-color);
  width: 100%;
  height: 95px;
  box-shadow: 0 5px 10px 0.1px var(--slight-box-shadow);
  border: 2px solid var(--dark-accent);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;
const FollowsWrapper = styled.div`
  margin-left: 5%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
const FollowerWrapper = styled.div`
  background: transparent;
  position: relative;
  width: 250px;
  transition: 0.4s ease-in-out;
`;
const BannerWrapper = styled.div`
  position: absolute;
  background: transparent;
  overflow: hidden;
  background: var(--dropDown-bg-color);
  border-bottom: 2px solid var(--dark-accent);
  opacity: 0.7;
  width: 100%;
  height: 95px;
`;

const Banner = styled.img`
  width: 100%;
  height: auto;
`;

const StatsWrapper = styled.div`
  padding-top: 2px;
  padding-right: 5px;
  background: transparent;
  font-weight: bold;
  font-size: 22px;
  position: absolute;
  right: 60px;
  bottom: 20px;
`;

const Stat = styled.span`
  background: transparent;
`;

const Icon = styled.img`
  position: absolute;
  right: 5px;
  bottom: 7px;
  width: 50px;
  background: transparent;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StatNumber = styled.div`
  background: transparent;
`;

const Name = styled.div`
  background: transparent;
  z-index: 2;
  background: var(--dropDown-bg-color);
  padding: 2px 5px;
  border-radius: 2px;
  border: 2px solid var(--primary-border-color);
  position: absolute;
  top: 75px;
  left: 60px;
  font-size: 24px;
  font-weight: bold;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: translate(-2%);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const AvatarWrapper = styled.div`
  background: transparent;
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
  transition: 0.2s ease-in-out;
  &:hover {
    transform: rotate(5deg);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const ImageAndNameWrapper = styled.div`
  border-radius: 2px;
  border: 2px solid var(--dark-accent);
  background: transparent;
  position: relative;
  height: 180px;
  margin-bottom: 20px;
`;
const Avatar = styled.img`
  width: 100%;
  height: auto;
`;
const StyledLink = styled(Link)`
  background: transparent;
  text-decoration: none;
  color: black;
`;
const Wrapper = styled.div``;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin: 10px 0 0 40px;
  background: var(--primary-bg-color);
`;

const Border = styled.div`
  margin-bottom: 30px;
  margin-left: 20px;
  width: 90%;
  height: 3px;
  background: var(--dark-accent);
`;

export default ProfileFollowers;
