module.exports = {
  development: {
    username: process.env.USERNAMEDV,
    password: "",
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  test: {
    username: process.env.USERNAMEDV,
    password: "",
    database: process.env.DATABASETEST,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.USERNAMEDV,
    password: "",
    database: process.env.PRODUCTION,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
