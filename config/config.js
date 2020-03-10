module.exports = {
  MondoDB: {
    url:
      "mongodb+srv://mywallet:goit34GH@wallet2-ciilx.mongodb.net/test?retryWrites=true&w=majority"
  },
  client: {
    development: {
      url: "http://localhost",
      port: "3000"
    }
  },
  jwt_encryption: process.env.JWT_ENCRYPTION || "jwt_please_change",
  jwt_expiration: process.env.JWT_EXPIRATION || 10000
};
