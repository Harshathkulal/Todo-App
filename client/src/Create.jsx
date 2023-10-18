import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Create({ fetchTodos }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;

  const handleAdd = () => {
    if (!task) {
      setError("Please enter a task before adding.");
      return;
    }

    axios
      .post("https://todo-app-2zvd.vercel.app/add", { task })
      .then((result) => {
        // Clear the input field
        setTask("");
        setError(null);
        console.log(result);
        // trigger a refresh of the todo list here
        fetchTodos();
      })
      .catch((err) => {
        setError("An error occurred while adding the task.");
        console.log(err);
      });
  };

  return (
    <div className="d-flex gap-2">
      <input
        type="text"
        name="input"
        className="form-control border border-success"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="btn btn-secondary" type="button" onClick={handleAdd}>
        Add
      </button>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default Create;
