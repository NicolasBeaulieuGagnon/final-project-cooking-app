const { generateUploadUrl } = require("./s3");

const getSecureLink = async (req, res) => {
  const url = await generateUploadUrl();
  res.send({ url });
};

module.exports = {
  getSecureLink,
};
