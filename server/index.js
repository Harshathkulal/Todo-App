// server.js
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./Models/Todo");
const NodeCache = require("node-cache");

dotenv.config({ path: "./config.env" });
const app = express();
const PORT = process.env.PORT;

// Create a cache with a 5-minute expiration time
const cache = new NodeCache({ stdTTL: 300 });

app.options('/add', cors());
app.use(
  cors({
    origin: ["https://todo-app-omega-lake.vercel.app", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To DB");
  })
  .catch((err) => {
    console.log(`Connection Failed to DB ${err}`);
  });

app.get("/", (req, res) => {
  res.json("Server Running");
});

app.get("/get", (req, res) => {
  // Check if data is in the cache
  const cachedData = cache.get("todos");
  if (cachedData) {
    // If data is in the cache, return it
    return res.json(cachedData);
  }

  // If data is not in the cache, retrieve it from the database
  Todo.find()
    .then((result) => {
      // Store the data in the cache with a 5-minute expiration
      cache.set("todos", result, 300);
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  Todo.create({
    task: task,
  })
    .then((result) => {
      // Clear the cache when new data is added
      cache.del("todos");
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body.task;

  Todo.findByIdAndUpdate(id, { task: updatedTask })
    .then((result) => {
      // Clear the cache when data is updated
      cache.del("todos");
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete({ _id: id })
    .then((result) => {
      // Clear the cache when data is deleted
      cache.del("todos");
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
