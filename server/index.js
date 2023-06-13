const express = require("express");
var mongoose = require('mongoose');

const TodoModel = require("../models/todo");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//database connection
const uri = 'mongodb+srv://whofeih:Loaded021387@cluster0.no0tbks.mongodb.net/todo-app?retryWrites=true&w=majority';
mongoose.connect(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected Database Successfully');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.json());

app.get("/todos", async (req, res) => {
  // Get list of tasks + search
  const { search } = req.query;
  let todos = [];
  if (search) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      todos = await TodoModel.find({task: {$regex: searchRgx, $options: "i"}}).sort({task: 'asc'});
  } else {
      todos = await TodoModel.find({}).sort({task: 'asc'});
  }
  res.status(200).send({"todos": todos});
});

app.post("/todo", async (req, res) => {
  // insert task
  const todoModel = new TodoModel();
  todoModel.task = req.body.task;
  todoModel.status = 0;

  const savedTodo = await todoModel.save();
  res.status(200).send(savedTodo);
});

app.put("/todo", async (req, res) => {
  // update task
  const updatedTodo = await TodoModel.findByIdAndUpdate(req.body.id, {task: req.body.task, status: req.body.status}, {new: true});
    
  res.status(200).send(updatedTodo);
});

app.post("/clear-tasks", async (req, res) => {
  // delete all tasks
  const result = await TodoModel.deleteMany({});
  res.status(200).send(result);
})