const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let teamsData = [
  { name: "Team 1", case1: 0, case2: 0, cipher: 0 },
  { name: "Team 2", case1: 0, case2: 0, cipher: 0 }
];

 app.get('/teams', (req, res) => {
  res.json(teamsData);
});

 app.post('/teams', (req, res) => {
  const newData = req.body;
  if (Array.isArray(newData)) {
    teamsData = newData;
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'error', message: 'Неверный формат данных' });
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
