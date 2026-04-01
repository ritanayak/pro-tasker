import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
//import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data))
    .catch(err => console.error(err));
  }, []);

  const createProject = async () => {
    const name = prompt("Project name");
    if (!name) return;

    const { data } = await API.post("/projects", { name });
    setProjects([...projects, data]);
  };

  return (
    <>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1>My Projects</h1>

          <button onClick={createProject} style={styles.btn}>
            + New Project
          </button>
        </div>

        <div style={styles.grid}>
          {projects.map((p) => (
            <div key={p._id} style={styles.card}>
              <h3>{p.name}</h3>
              <Link to={`/projects/${p._id}`} style={styles.link}>
                Open →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "30px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  btn: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },
  card: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  },
  link: {
    color: "#2563eb",
    textDecoration: "none"
  }
};