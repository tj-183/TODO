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


  app.get('/tasks/:boardId', async (req, res) => {

    const boardId = req.params.boardId;
    try {
      const response = await client.query(`SELECT * FROM public.tasks WHERE public.tasks."boardId" = ${boardId} and public.tasks."isDeleted" = false;`);
      response.status = 200;
      res.send(response);
    }
    catch (error) {
      error.status = 400;
      res.send(error);
    }
  });

  app.get('/boards', async (req, res) => {
    const response = await client.query('SELECT * FROM public.boards where "isDeleted"=false');

    res.send(response.rows)
  });

  app.post('/add/task', async (req, res) => {

    try {
      const body = req.body;
      const query = `INSERT INTO public.tasks("boardId", name, description) VALUES (${body.boardId}, '${body.name}', '${body.description}');`
      const response = await client.query(query);
      response.status = 200;
      console.log(response);
      res.send(response);
    }
    catch (error) {
      error.status = 400;
      res.send(error);
    }
  });

  app.put('/delete/board/:boardId', async (req, res) => {
    const response = await client.query(`UPDATE public.boards SET "isDeleted"=true WHERE id=${req.body.id};`);
    res.json(response)
  });

  app.put('/delete/task/:taskId', async (req, res) => {
    const response = await client.query(`UPDATE public.tasks SET "isDeleted"=true WHERE id=${req.body.id};`);
    res.json(response)
  });

  app.put('/complete/task/:taskId', async (req, res) => {
    const response = await client.query(`UPDATE public.tasks SET "isDone"=true WHERE id=${req.body.id}`);
    res.json(response)
  });

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});