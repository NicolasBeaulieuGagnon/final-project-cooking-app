import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

import cookbookIcon from "../assets/designIcons/cookbook.png";
import qOne from "../assets/randomquestion1.png";
import qTwo from "../assets/randomquestion2.png";
import qThree from "../assets/randomquestion3.png";
import chef from "../assets/designIcons/chef.png";
import fridge from "../assets/designIcons/012-fridge.png";
import logo from "../assets/designIcons/004-chef.png";
import randomIcon from "../assets/designIcons/random.png";
import newsFeedIcon from "../assets/designIcons/035-voucher.png";
import profileImage from "../assets/profileImage.jpg";
import Footer from "./Footer";

const About = () => {
  return (
    <Wrapper>
      <Title>
        Welcome to <Bold>What's Cooking</Bold>
        <LogoIcon src={logo} />
      </Title>
      <IntroParagraph>
        This is an Online Cookbook builder! Answer random questions, find
        recipes add them to your Cookbook!
        <Div>
          <RandomIcon src={randomIcon} />
        </Div>
        <RandomRecipeWrapper>
          <PhotoIconOne src={qOne} />
          <PhotoIconTwo src={qTwo} />
          <PhotoIconThree src={qThree} />
          <ArrowsDiv>
            <HiOutlineArrowNarrowDown size="18" />
            <HiOutlineArrowNarrowDown size="33" />
            <HiOutlineArrowNarrowDown size="28" />
          </ArrowsDiv>

          <CookBookIcon src={cookbookIcon} alt="cookbook icon" />
        </RandomRecipeWrapper>
        Create an Account to save your recipes.
        <Div>
          <ChefIcon src={chef} />
        </Div>
        Check what you have in your fridge and let us find you something that
        matches as much as possible
        <Div>
          <FridgeIcon src={fridge} />
        </Div>
        Share your findings in the newsFeed! Some recipes are rarer than others!
        <Div>
          <NewsFeedIcon src={newsFeedIcon} />
        </Div>
        Enjoy!
        <AboutMe>
          <InfoParagraph>
            Hi! My name is Nicolas Beaulieu-Gagnon, I am the creator of this
            app. I hope you find the recipes you are looking for and connect
            with a few other passionate cooks like me! This is my first coding
            project after branching off from 10 years of cooking! Hope you
            enjoy! -Nicolas
          </InfoParagraph>

          <AboutMeImg src={profileImage} />
        </AboutMe>
      </IntroParagraph>
      <FooterTitle>
        None of this would have been possible without these :
      </FooterTitle>
      <Footer />
    </Wrapper>
  );
};

const InfoParagraph = styled.div`
  background: transparent;
  margin-right: 10px;
`;

const AboutMe = styled.div`
  display: flex;
  background: transparent;
  margin-top: 20px;
  font-size: 20px;
  padding-bottom: 10px;
`;

const AboutMeImg = styled.img`
  height: 300px;
  border: 2px solid var(--dark-accent);
  border-radius: 3px;
`;

const FooterTitle = styled.div`
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
  border-bottom: 2px solid var(--dark-accent);
  border-top: 2px solid var(--dark-accent);
`;

const NewsFeedIcon = styled.img`
  width: 100px;
`;

const RandomIcon = styled.img`
  width: 100px;
`;
const LogoIcon = styled.img`
  width: 100px;
`;

const Div = styled.div`
  background: transparent;
`;
const ArrowsDiv = styled.div`
  padding: 5px;
  background: transparent;
  display: flex;
`;

const ChefIcon = styled.img`
  width: 100px;
`;
const FridgeIcon = styled.img`
  width: 100px;
`;
const RandomRecipeWrapper = styled.div`
  background: transparent;
  padding-top: 10px;
  padding-bottom: 20px;
  border-top: none;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PhotoIconOne = styled.img`
  width: 200px;
  border: 2px solid var(--dark-accent);
  transform: rotate(14deg);
`;
const PhotoIconTwo = styled(PhotoIconOne)`
  transform: rotate(-13deg);
`;
const PhotoIconThree = styled(PhotoIconOne)`
  transform: rotate(7deg);
`;

const CookBookIcon = styled.img`
  width: 120px;
`;

const Title = styled.div`
  text-shadow: 2px 2px 10px white;
  background: rgb(207, 207, 207);
  border-bottom: 2px solid var(--primary-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: normal;
  font-size: 45px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
`;
const IntroParagraph = styled.div`
  margin-top: -2px;
  border-left: 2px solid var(--primary-border-color);
  border-right: 2px solid var(--primary-border-color);
  background: rgb(207, 207, 207);
  font-weight: bold;
  width: 80%;
  margin-left: 10%;
  padding: 5px 15px;
  font-size: 25px;
`;
const Bold = styled.span`
  background: transparent;
  font-weight: bold;
`;

const Wrapper = styled.div`
  text-align: center;
`;

export default About;
