const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: String,
  });
  
  const Todo = mongoose.model('Todo', todoSchema);
  module.exports=Todo