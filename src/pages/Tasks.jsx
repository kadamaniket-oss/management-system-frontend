import React, { useEffect, useState } from "react";
import API from "../services/api";
// import "./Tasks.css";
const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      alert("Failed To Fetch Tasks ❌");

    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      if (editId) {

        await API.put(`/tasks/${editId}`, taskData);

        alert("Task Updated ✅");

      } else {

        await API.post("/tasks", taskData);

        alert("Task Created 💐");
      }

      setTaskData({
        title: "",
        description: "",
        status: "",
      });

      setEditId(null);

      fetchTasks();

    } catch (error) {

      alert("Operation Failed");
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      alert("Task Deleted");

      fetchTasks();

    } catch (error) {

      alert("Delete Failed ❌");
    }
  };

  const editTask = (task) => {

    setTaskData({
      title: task.title,
      description: task.description,
      status: task.status,
    });

    setEditId(task.id);
  };

  return (
    <div
      className="container mt-5"
    >

      <div
        className="card p-4 w-50 me-4  shadow mb-4"
      >

        <h2 className="mb-4">Task Manager</h2>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="form-control mb-3"
          value={taskData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Task Description"
          className="form-control mb-3"
          value={taskData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="status"
          placeholder="Task Status"
          className="form-control mb-3"
          value={taskData.status}
          onChange={handleChange}
        />

        <button
          className="btn btn-success"
          onClick={handleSubmit}
        >
          {editId ? "Update Task" : "Add Task"}
        </button>

      </div>

      {
        tasks.map((task) => (
         
            <div
              key={task.id}
              className="card shadow  m-3"
            >

              <h4 className="text-dark">{task.title}</h4>

              <p className="text-dark fw-bold">{task.description}</p>

              <p>
                <strong>Status:</strong> <span className="text-danger">{task.status}</span>
              </p>

              <div className="row">

                <button
                  className="btn col btn-warning me-2"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>

                <button
                  className="btn col btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>

            </div>
        ))
      }

    </div>
  );
};

export default Tasks;

