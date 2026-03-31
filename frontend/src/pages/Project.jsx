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

    return(
        <div>
            <h2>Tasks</h2>
            {tasks.map (t => (
                <div key={t._id}> {t.title} </div>
            ))}
        </div>
    );
}