import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

function Home() {
    const [todos,setTodos]=useState([])
    const [editingTodoId, setEditingTodoId] = useState(null); // To keep track of the todo being edited
    const [editedTask, setEditedTask] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))
    },[])

    const handleDelete=(id)=>{
      axios.delete('http://localhost:3001/delete/'+id)
        .then(result=>{
          location.reload()
        })
        .catch(err=>console.log(err))
    }


    const handleEdit = (id, task) => {
      setEditingTodoId(id);
      setEditedTask(task);
    }

    const handleSaveEdit = (id) => {
      // Send a PUT request to update the task on the server
      axios.put(`http://localhost:3001/update/${id}`, { task: editedTask })
        .then(result => {
          // Update the task in the state
          const updatedTodos = todos.map(todo =>
            todo._id === id ? { ...todo, task: editedTask } : todo
          );
          setTodos(updatedTodos);
          // Clear the editing state
          setEditingTodoId(null); 
          setEditedTask('');
        })
        .catch(err => console.log(err));
    }

    return (
      <div>
        <h2>Todo-List</h2>
        <Create />
        {todos.length === 0 ? <div><h2>No Records</h2></div> :
          todos.map(todo => (
            <div key={todo._id}>
              {editingTodoId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                </>
              ) : (
                <>
                  <p>{todo.task}</p>
                  <div>
                    <button onClick={() => handleEdit(todo._id, todo.task)}>Edit</button>
                    <button onClick={() => handleDelete(todo._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        }
      </div>
    );
  }
  
  export default Home;

