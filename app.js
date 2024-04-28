import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import TodoModel from "./Models/todo.js";

const app = express();
const port = process.env.port;
const database = process.env.database;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(database)
  .then(() => console.log("connect database success"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  TodoModel.find()
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findById(id)
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
});

app.post("/", (req, res) => {
  TodoModel.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date,
    }
  )
    .then((item) => res.json(item))
    .catch((err) => console.error(err));
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete(id)
    .then(() => console.log("delete success"))
    .catch((err) => console.error(err));
});

app.listen(port, () => {
  console.log(`server start ${port}`);
});
