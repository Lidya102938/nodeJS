require("dotenv").config();
const express = require("express");
const Users = require("./models/Users");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("./models/index").sequelize;

app.use(express.json());

app.post("/post", async (req, res) => {
  const saltRound = 10;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, saltRound);
  console.log(hashPassword, "Ini pass yang sudah di hash");
  try {
    const data = await Users(sequelize, DataTypes).create({
      username: req.body.username,
      password: hashPassword,
      fullname: req.body.fullname,
      age: req.body.age,
      occupation: req.body.occupation,
      isMarried: req.body.isMarried,
    });
    res.json(data);
  } catch (Error) {
    console.log(Error.errors[0].message);
    res.status(422).json({ message: Error.sqlMessage });
  }
});

app.get("/ambil", async (req, res) => {
  const data = await Users(sequelize, DataTypes).findAll({
    where: { username: req.query.username },
  });
  res.json(data);
});

app.put("/update/:id", async function (req, res) {
  const id = req.params.id;
  const data = await Users(sequelize, DataTypes).update(
    { name: req.body.name, email: req.body.email, password: req.body.password },
    {
      where: {
        id: id,
      },
    }
  );
  res.json({ pesan: "Data berhasil di update" });
});

app.delete("/hapus/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Users(sequelize, DataTypes).destroy({
    where: {
      id: id,
    },
  });
  res.json(data);
});

app.post("/login", async (req, res) => {
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
});

const autentiCation = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  const user = jwt.decode(token, process.env.TOKEN);
  console.log(user);
  if (!user) res.json({ message: "gak ada" });
  req.payload = user;
  next();
};

app.post("/daftar", autentiCation, async (req, res) => {
  try {
    console.log(req.payload);
    res.json({ message: "Hallo Kamu!" });
  } catch (Error) {
    console.log(Error.errors[0].message);
    res.status(422).json({ message: Error.sqlMessage });
  }
});

app.listen(process.env.PORT, () => console.log("Listening at port: " + process.env.PORT));
