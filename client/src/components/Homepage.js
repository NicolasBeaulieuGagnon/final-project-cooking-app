import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [secretUrl, setSecretUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const postPicture = async () => {
    const imageInput = await document.getElementById("myFile");
    await fetch("/s3Url").then((res) => {
      res.json().then((data) => {
        setSecretUrl(data.url);
      });
    });
    setFile(imageInput.files[0]);
  };
  console.log(imageUrl);

  useEffect(() => {
    if (secretUrl) {
      console.log("made it here");
      fetch(secretUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      }).then(() => {
        setImageUrl(secretUrl.split("?")[0]);
      });
    }
  }, [secretUrl]);

  return (
    <Wrapper>
      <InputImage type="file" id="myFile" name="filename"></InputImage>
      <button type="submit" onClick={postPicture}>
        submit
      </button>

      <>{imageUrl && <img src={imageUrl} alt="uploaded image" />}</>
    </Wrapper>
  );
};

const InputImage = styled.input``;
const Wrapper = styled.div`
  background: var(--primary-bg-color);
`;

export default Homepage;
