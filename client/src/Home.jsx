import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [todos,setTodos]=useState([])
    const [editingTodoId, setEditingTodoId] = useState(null); // To keep track of the todo being edited
    const [editedTask, setEditedTask] = useState('');
    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get('https://todo-app-server-iota.vercel.app/get')
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))
    },[])

    const handleDelete=(id)=>{
      axios.delete('https://todo-app-server-iota.vercel.app/delete/'+id)
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
      axios.put(`https://todo-app-server-iota.vercel.app/update/${id}`, { task: editedTask })
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
      <div className='container text-center'>
        <h2 className='display-5 fw-bold text-body-emphasis'>Todo-List</h2>
        <Create />
        {todos.length === 0 ? <div><h2>No Records</h2></div> :
          todos.map(todo => (
            <div key={todo._id}>
              {editingTodoId === todo._id ? (
                <div className='d-flex justify-content-between mt-3 text-center text-wrap border border-white rounded-3'>
                  <input className='form-control'
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button className='btn bg-primary' onClick={() => handleSaveEdit(todo._id)}>Save</button>
                </div>
              ) : (
                <div className='d-flex justify-content-between mt-3 text-center bg-dark text-white border border-white rounded-3'>
                  <p className='m-2 text-wrap'>{todo.task}</p>
                  <div className=''>
                    <button className='btn text-white' onClick={() => handleEdit(todo._id, todo.task)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
                    <button className='btn text-white' onClick={() => handleDelete(todo._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></button>
                  </div>
                </div>
              )}
            </div>
          ))
        }
      </div>
    );
  }
  
  export default Home;

