import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";


export default function Project() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        API.get(`/projecgts/${id}/tasks`)
        .then (res => setTasks(res.data));
    }, [id]);

    const createTask = async () => {
        const title = prompt('Task title');
        const { data } = await API.post(`/projects/${id}/tasks`, { title});
        setTasks([...tasks, data]);
    };

    return(
        <div>
            <h2>Tasks</h2>
            <button onClick={createTask}>Add Task</button>
            {tasks.map (t => (
                <div key={t._id}> {t.title} </div>
            ))}
        </div>
    );
}