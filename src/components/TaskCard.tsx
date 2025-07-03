import type { Task } from "../types";
import { fetchSubtasksFromGemini } from "../utils/api";
import { useState } from "react";

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (t: Task) => void;
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const subtasks = await fetchSubtasksFromGemini(task.title);
      onUpdate({ ...task, subtasks });
    } catch (error) {
      console.error("AI Suggestion Failed:", error);
      alert("AI Suggestion Failed");
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 w-full">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            className="input mb-2 w-full"
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            value={editedTask.description}
            className="textarea mb-2 w-full"
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <input
            type="date"
            value={editedTask.dueDate}
            className="input mb-2 w-full"
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <select
            className="input mb-2 w-full"
            value={editedTask.status}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                status: e.target.value as "pending" | "completed",
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-1 rounded text-sm"
              onClick={saveEdit}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-1 rounded text-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <span className="text-sm text-gray-500">{task.status}</span>
          </div>
          <p className="mb-2">{task.description}</p>
          <p className="text-sm text-gray-600 mb-2">Due: {task.dueDate}</p>

          {task.subtasks?.length > 0 && (
            <ul className="list-disc pl-6 text-sm text-gray-700 mb-2">
              {task.subtasks?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={handleSuggest}
              className="bg-indigo-600 text-white px-4 py-1 rounded text-sm"
              disabled={loading}
            >
              {loading ? "Suggesting..." : "Suggest Subtasks"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
