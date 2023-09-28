// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo=require("./Models/Todo")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/get',(req, res) => {
  Todo.find()
  .then(result=> res.json(result))
  .catch(err=>res.json(err))
})

app.post('/add',(req, res) => {
  const task=req.body.task;
  Todo.create({
    task:task
  }).then(result=>res.json(result))
  .catch(err=>res.json(err))
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body.task;

  Todo.findByIdAndUpdate(
    id,
    { task: updatedTask }
  )
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
});

app.delete('/delete/:id',(req, res) => {
  const {id}=req.params;
  Todo.findByIdAndDelete({_id:id})
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

