const config = {
  PORT: process.env.PORT || 3007,
  DATA_URL: process.env.DATA_URL ||   "mongodb://localhost:27017/cross-trial",
  TEST_PORT: 3008
};

export default config;