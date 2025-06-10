import { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const markComplete = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].completed = true;
      updatedTasks.push(updatedTasks.splice(index, 1)[0]);

      return updatedTasks;
    });
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, fading: true } : task
        )
      );
    }, 5000);
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.fading));
    }, 6000);
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <input
        type="text"
        className="todo-input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask}>Add Task</button>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "todo-item completed" : "todo-item"}
            onClick={() => markComplete(index)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
