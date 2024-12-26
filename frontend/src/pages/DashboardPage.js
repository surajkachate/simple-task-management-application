import { useState, useEffect, useContext } from "react";
import { FaCheck, FaTrash, FaPlus } from "react-icons/fa"; // Import icons from react-icons
import TaskModal from "../components/TaskModal";
import { AuthContext } from "../context/authContext";

const DashboardPage = () => {
  const { isAuthenticated } = useContext(AuthContext); // Authentication context
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch tasks on component mount or authentication state change
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (isAuthenticated && token) {
      fetchTasks();
    } else {
      console.warn("User not authenticated or missing token.");
    }
  }, [isAuthenticated]);

  /**
   * Fetch tasks from the server.
   */
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Missing authentication token.");
        return;
      }

      const response = await fetch(`${BASE_URL}/task/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.data || []);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch tasks:", errorData.message);
      }
    } catch (error) {
      console.error("Error while fetching tasks:", error);
    }
  };

  /**
   * Toggle task completion status.
   * @param {string} taskId - The ID of the task.
   */
  const toggleTaskCompletion = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      const task = tasks.find((t) => t._id === taskId);

      if (!task) {
        console.error("Task not found.");
        return;
      }

      const response = await fetch(`${BASE_URL}/task/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to update task completion status.");
      }
    } catch (error) {
      console.error("Error while toggling task completion:", error);
    }
  };

  /**
   * Delete a task.
   * @param {string} taskId - The ID of the task to delete.
   */
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/task/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  /**
   * Add a new task.
   * @param {string} taskTitle - The title of the new task.
   */
  const addNewTask = async (taskTitle) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/task/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: taskTitle.title, description: taskTitle.description }),
      });

      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to add new task.");
      }
    } catch (error) {
      console.error("Error while adding a new task:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <button
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mr-2" /> Add New Task
      </button>

      <div className="mt-6">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">
                    {task.description || "No description available"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`flex items-center justify-center px-3 py-2 rounded text-white ${
                      task.completed ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                    onClick={() => toggleTaskCompletion(task._id)}
                  >
                    <FaCheck className="mr-1" />
                    {task.completed ? "Completed" : "Mark as Complete"}
                  </button>
                  <button
                    className="flex items-center justify-center px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    onClick={() => deleteTask(task._id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No tasks available. Add a new task!</p>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          closeModal={() => setIsModalOpen(false)}
          handleAddTask={addNewTask}
        />
      )}
    </div>
  );
};

export default DashboardPage;
