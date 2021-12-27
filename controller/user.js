const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;
const UserModel = require("../models/Users");
const Users = UserModel(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  post: async (req, res) => {
    const saltRound = 10;
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, saltRound);
    console.log(hashPassword, "Ini pass yang sudah di hash");
    try {
      const data = await Users.create({
        username: req.body.username,
        password: hashPassword,
        fullname: req.body.fullname,
        age: req.body.age,
        occupation: req.body.occupation,
        isMarried: req.body.isMarried,
      });
      res.json(data);
    } catch (Error) {
      console.log(Error);
      res.status(422).json({ message: Error.sqlMessage });
    }
  },
  ambil: async (req, res) => {
    const data = await Users(sequelize, DataTypes).findAll({
      where: { username: req.query.username },
    });
    res.json(data);
  },
  login: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const data = await Users(sequelize, DataTypes).findOne({
        where: {
          username: username,
        },
      });
      if (!data) {
        throw Error("Data tidak ditemukan");
      }
      const isVeryvied = await bcrypt.compare(password, data.password);
      console.log(isVeryvied);
      if (!isVeryvied) {
        throw Error("Password salah");
      }

      const payload = {
        Username: process.env.USERNAME,
        password: process.env.PASSWORD,
      };
      const token = jwt.sign(payload, process.env.TOKEN);
      res.json({ username: data.username, data: data.password, token: token });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },
  const: (autentiCation = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    const user = jwt.decode(token, process.env.TOKEN);
    console.log(user);
    if (!user) res.json({ message: "gak ada" });
    req.payload = user;
    next();
  }),
  daftar: async (req, res) => {
    try {
      console.log(req.payload);
      res.json({ message: "Hallo Kamu!" });
    } catch (Error) {
      console.log(Error.errors[0].message);
      res.status(422).json({ message: Error.sqlMessage });
    }
  },
};
