import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { Task } from "../types";
import TaskCard from "../components/TaskCard";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending" as "pending" | "completed", // 👈 include status
  });

  const addTask = () => {
    const task: Task = {
      id: uuid(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: newTask.status,
      subtasks: [],
    };
    setTasks([task, ...tasks]);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      status: "pending",
    });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (updated: Task) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-200 to-teal-900 p-4 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧠 Smart Task Manager
      </h1>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded shadow-md max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Task title"
          className="input mb-2 w-full bg-slate-300 text-black"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="textarea mb-2 w-full bg-slate-300 text-black"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="date"
          className="input mb-2 w-full bg-slate-300 text-black"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select
          className="input mb-4 w-full bg-slate-300 text-black"
          value={newTask.status}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              status: e.target.value as "pending" | "completed",
            })
          }
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button
          className="bg-gradient-to-br from-teal-300 to-teal-500 text-white px-4 py-2 rounded w-full"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
