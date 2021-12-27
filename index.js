require("dotenv").config();
const express = require("express");
const app = express();
const UserController = require("./controller/user");

app.use(express.json());

app.post("/post", UserController.post);

app.get("/ambil", UserController.ambil);

app.post("/login", UserController.login);

app.post("/daftar", UserController.daftar);

app.listen(process.env.PORT, () => console.log("Listening at port: " + process.env.PORT));
