import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["Example A", "Example B", "Example C"]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => setNewTask(event.target.value);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="input-add">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          aria-label="New Task"
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            onRemove={removeTask}
            onMoveUp={moveTaskUp}
            onMoveDown={moveTaskDown}
          />
        ))}
      </ol>
    </div>
  );
}

function Task({ task, index, onRemove, onMoveUp, onMoveDown }) {
  return (
    <li>
      <span className="task-text">{task}</span>
      <button className="delete-button" onClick={() => onRemove(index)}>
        Delete
      </button>
      <button className="move-button" onClick={() => onMoveUp(index)}>
        Up
      </button>
      <button className="move-button" onClick={() => onMoveDown(index)}>
        Down
      </button>
    </li>
  );
}

export default ToDoList;
