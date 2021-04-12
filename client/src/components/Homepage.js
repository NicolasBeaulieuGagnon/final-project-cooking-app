import React, { useState } from "react";
import styled from "styled-components";

const Homepage = () => {
  const [secretUrl, setSecretUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const postPicture = async () => {
    const imageInput = await document.getElementById("myFile");
    await fetch("/s3Url").then((res) => {
      res.json().then((data) => {
        setSecretUrl(data.url);
      });
    });
    const file = imageInput.files[0];

    await fetch(secretUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    setImageUrl(secretUrl.split("?")[0]);
    console.log(imageUrl);
  };
  return (
    <Wrapper>
      {/* <InputImage type="file" id="myFile" name="filename"></InputImage>
      <button type="submit" onClick={postPicture}>
        submit
      </button>
      <>{imageUrl && <img src={imageUrl} alt="uploaded image" />}</> */}
    </Wrapper>
  );
};

const InputImage = styled.input``;
const Wrapper = styled.div`
  background: var(--primary-bg-color);
`;

export default Homepage;
