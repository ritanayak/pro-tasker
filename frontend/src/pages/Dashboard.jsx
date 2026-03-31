import { useEffect, useState } from "react";
import API from "../services/api";
import {Link} from 'react-router-dom';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        API.get('/projects').then (res => setProjects(res.data));
    }, []);

    return (
        <div>
        <h2>My Project</h2>
        {projects.map(p => (<div key={p._id}>
            <Link to ={`/projects/${p._id}`}>{p.name}</Link>
            </div>
        ))}
        </div>
    );
}