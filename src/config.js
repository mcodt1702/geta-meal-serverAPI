module.exports = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL_dev: process.env.DATABASE_URL_dev,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://marco@localhost/getameal",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://marco@localhost/testgetameal",
};
