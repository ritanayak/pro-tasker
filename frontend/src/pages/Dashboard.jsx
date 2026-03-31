import { useEffect, useState } from "react";
import API from "../services/api";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const {logout} = useContext(AuthContext);

    // Fetch projects
    useEffect(() => {
        API.get('/projects').then (res => setProjects(res.data));
    }, []);

    // Create project
    const createProject = async () => {
        const name = prompt('Project name');
        if (!name) return;

        const { data } = await API.post ('/projects', { name });
        setProjects ([...projects, data]);
    };


    return (
        <div style={{ padding: "20px" }}>
      <h2>My Projects</h2>

      <button onClick={createProject}>Add Project</button>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>

      <div style={{ marginTop: "20px" }}>
        {projects.map(p => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}