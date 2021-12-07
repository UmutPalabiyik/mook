import dotenv from "dotenv";


dotenv.config({
  path: `./${process.env.NODE_ENV}.env`,
});

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ORIGIN: process.env.ORIGIN,
};

export default config;
