import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks"); // Replace with your backend URL
        if (response.ok) {
          const data = await response.json();
          setTasks(data); // Set tasks to fetched data
        } else {
          console.error("Failed to fetch tasks");
          setTasks([]); // Set tasks to empty array if the fetch fails
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Set tasks to empty array if there's an error
      }
    };

    fetchTasks();
  }, []); // Runs only once when the component mounts

  const handleDelete = async (taskIndex, taskId) => {
    try {
      // Delete task from backend
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the task locally
        const newTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(newTasks);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
