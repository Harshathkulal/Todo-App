// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo=require("./Models/Todo")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(
  {
    origin:"https://todo-app-omega-lake.vercel.app/",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  }
));
const DB = 'mongodb+srv://harshathmkulal:Harsha5@cluster0.vscw8kb.mongodb.net/todos?retryWrites=true&w=majority';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("Connected To DB")
}).catch((err)=>{console.log(`Connection Failed to DB ${err}`)
});

app.get('/',(req,res)=>{
  res.json(" Server Running");
})

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

