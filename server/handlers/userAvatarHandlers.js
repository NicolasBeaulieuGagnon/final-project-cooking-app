const { generateUploadUrl } = require("./s3");
const defaultUserAvatars = require("../../defaultUserAvatars.json");

const getSecureLink = async (req, res) => {
  const url = await generateUploadUrl();
  res.send({ url });
};

const getAllStoredAvatarChoices = (req, res) => {
  res.status(200).json({ status: 200, data: defaultUserAvatars });
};
module.exports = {
  getSecureLink,
  getAllStoredAvatarChoices,
};
