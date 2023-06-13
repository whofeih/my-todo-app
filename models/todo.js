const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {type: String},
  status: {type: Number},
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;