import React,{useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function Create() {
    const [task,setTask]= useState()
    const handleAdd=() => {
        axios.post('http://localhost:3001/add',{task:task})
        .then(result=>console.log(result))
        .then(result=>location.reload())
        .catch(err=>console.log(err))

    }
  return (
    <div className='d-flex gap-2'>
      <input type="text" name="input" className='form-control' placeholder='Enter Task' onChange={(e)=> setTask(e.target.value)}/>
      <button className='btn btn-secondary' type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
