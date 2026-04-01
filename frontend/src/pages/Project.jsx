import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Project() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [analytics, setAnalytics] = useState(null);

  //  FETCH TASKS
  useEffect(() => {
    API.get(`/projects/${id}/tasks`, {
      params: { search, status, priority },
    }).then((res) => setTasks(res.data));
  }, [id, search, status, priority]);

  //  ANALYTICS
  useEffect(() => {
    API.get(`/projects/${id}/tasks/analytics`).then((res) =>
      setAnalytics(res.data)
    );
  }, [id, tasks]);

  // ADD TASK
  const addTask = async () => {
    const title = prompt("Task title");
    const dueDate = prompt("Due date (YYYY-MM-DD)");

    if (!title) return;

    const { data } = await API.post(`/projects/${id}/tasks`, {
      title,
      dueDate,
    });

    setTasks([...tasks, data]);
  };

  //  STATUS UPDATE
  const updateStatus = async (taskId, status) => {
    const { data } = await API.patch(
      `/projects/${id}/tasks/${taskId}/status`,
      { status }
    );

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? data : t))
    );
  };

  //  EDIT TASK
  const editTask = async (task) => {
    const title = prompt("Edit title", task.title);
    const priority = prompt("Priority (Low/Medium/High)", task.priority);

    if (!title) return;

    const { data } = await API.patch(
      `/projects/${id}/tasks/${task._id}`,
      {
        title,
        priority,
        dueDate: task.dueDate,
      }
    );

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? data : t))
    );
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    await API.delete(`/projects/${id}/tasks/${taskId}`);

    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Project Tasks</h2>

      {/* ANALYTICS */}
      {analytics && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div>Total: {analytics.total}</div>
          <div>Pending: {analytics.pending}</div>
          <div>In Progress: {analytics.inProgress}</div>
          <div>Done: {analytics.done}</div>
          <div>High Priority: {analytics.highPriority}</div>
        </div>
      )}

      {/*  FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* ADD TASK */}
      <button onClick={addTask}>+ Add Task</button>

      {/* TASK LIST */}
      <div style={{ marginTop: "20px" }}>
        {tasks.map((t) => (
          <div
            key={t._id}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          >
            <h4>{t.title}</h4>

            {/* STATUS */}
            <select
              value={t.status}
              onChange={(e) => updateStatus(t._id, e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <p>Priority: {t.priority}</p>

            <p>
              Due:{" "}
              {t.dueDate
                ? new Date(t.dueDate).toLocaleDateString()
                : "No due date"}
            </p>

            <button onClick={() => editTask(t)}>Edit</button>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}