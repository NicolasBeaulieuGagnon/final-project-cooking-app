import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { LoggedInUserContext } from "./Providers/LoggedInUserProvider";

const Profile = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  console.log(loggedInUser);

  const userId = useParams();

  return <div></div>;
};

export default Profile;
