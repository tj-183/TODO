const path = require("path");
const { Client } = require('pg');
const express = require("express");
const cors = require("cors");
const { log } = require("console");
const app = express(); // create express app
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
const whitelist = ["http://localhost:3000", "http://localhost:5000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'TodoDB',
    password: '12345',
    port: 5432,
});
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  app.get('/tasks', async (req, res) => {

    const response = await client.query('SELECT * FROM public.tasks where "isDeleted"=false');

    // console.log(JSON.stringify(response.rows));
    res.send(response.rows)
  });

  app.get('/boards', async (req, res) => {
    const response = await client.query('SELECT * FROM public.boards where "isDeleted"=false');
    // console.log(JSON.stringify(response.rows));
    res.send(response.rows)
  });

  app.put('/delete/board/:boardId', async (req, res) => {
    const response = await client.query(`UPDATE public.boards SET "isDeleted"=true WHERE id=${req.body.id};`);
    res.json(response)
  })
// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});