const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Раздаём статику
app.use(express.static(path.join(__dirname, "public")));

let teamsData = [
  { name: "Team 1", case1: 0, case2: 0, cipher: 0 },
  { name: "Team 2", case1: 0, case2: 0, cipher: 0 },
];

app.get("/teams", (req, res) => {
  res.json(teamsData);
});

app.post("/teams", (req, res) => {
  const newData = req.body;
  if (Array.isArray(newData)) {
    teamsData = newData;
    res.json({ status: "success" });
  } else {
    res
      .status(400)
      .json({ status: "error", message: "Неверный формат данных" });
  }
});

// Главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Админка
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
