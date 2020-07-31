const convict = require("convict");

// Define a schema
const config = convict({
  port: {
    ini: 4000
  },
  json: {
    limit: "10mb"
  },
  jwtSign: {
    algorithm: "RS256",
    expiresIn: "7d"
  }
});

module.exports = config;
