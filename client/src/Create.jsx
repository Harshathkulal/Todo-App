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
    <div className='p-4'>
      <input type="text" name="input" className='m-2' placeholder='Enter Task' onChange={(e)=> setTask(e.target.value)}/>
      <button className='' type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
