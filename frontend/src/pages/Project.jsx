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

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // FORM STATE
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "To Do",
    dueDate: "",
  });

  // FETCH TASKS
  useEffect(() => {
    API.get(`/projects/${id}/tasks`, {
      params: { search, status, priority },
    }).then((res) => setTasks(res.data));
  }, [id, search, status, priority]);

  // ANALYTICS
  useEffect(() => {
    API.get(`/projects/${id}/tasks/analytics`).then((res) =>
      setAnalytics(res.data)
    );
  }, [id, tasks]);

  // ADD TASK
  const addTask = async () => {
    if (!form.title) return;

    const { data } = await API.post(`/projects/${id}/tasks`, {
      ...form,
    });

    setTasks([...tasks, data]);

    setShowModal(false);

    setForm({
      title: "",
      description: "",
      priority: "Low",
      status: "To Do",
      dueDate: "",
    });
  };

  // UPDATE STATUS
  const updateStatus = async (taskId, status) => {
    const { data } = await API.patch(
      `/projects/${id}/tasks/${taskId}/status`,
      { status }
    );

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? data : t))
    );
  };

  // EDIT TASK
  const editTask = async (task) => {
    const title = prompt("Edit title", task.title);
    const description = prompt("Edit description", task.description);
    const priority = prompt("Priority (Low/Medium/High)", task.priority);

    if (!title) return;

    const { data } = await API.patch(
      `/projects/${id}/tasks/${task._id}`,
      {
        title,
        description,
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
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Project Tasks</h2>

      {/* ANALYTICS */}
      {analytics && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div>Total: {analytics.total}</div>
          <div>To Do: {analytics.todo}</div>
          <div>In Progress: {analytics.inProgress}</div>
          <div>Done: {analytics.done}</div>
          <div>High Priority: {analytics.highPriority}</div>
        </div>
      )}

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* ADD TASK BUTTON */}
      <button onClick={() => setShowModal(true)}>+ Add Task</button>

      {/* TASK LIST */}
      <div style={{ marginTop: "20px" }}>
        {tasks.map((t) => (
          <div
            key={t._id}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{t.title}</h4>
            <p>{t.description}</p>

            <select
              value={t.status}
              onChange={(e) =>
                updateStatus(t._id, e.target.value)
              }
            >
              <option>To Do</option>
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
            <button onClick={() => deleteTask(t._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Create Task</h3>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              style={styles.input}
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={styles.textarea}
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              style={styles.input}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              style={styles.input}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              style={styles.input}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={addTask}>Create</button>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  textarea: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
};