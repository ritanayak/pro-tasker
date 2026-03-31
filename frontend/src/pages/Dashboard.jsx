import { useEffect, useState } from "react";
import API from "../services/api";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);

    // Fetch projects
    useEffect(() => {
        API.get('/projects').then (res => setProjects(res.data));
    }, []);

    const createProject = async () => {
        const name = prompt('Project name');
        const { data } = await API.post ('/projects', { name });
        setProjects ([...projects, data]);
    };

    const {logout} = useContext(AuthContext);

    return (
        <div>
        <h2>My Project</h2>
        <button onClick={ createProject}>Add Project</button>
        <button onClick={logout}>Logout</button>
        {projects.map(p => (<div key={p._id}>
            <Link to ={`/projects/${p._id}`}>{p.name}</Link>
            </div>
        ))}
        </div>
    );
}