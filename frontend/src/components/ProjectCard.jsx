import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{project.name}</h3>

      <Link to={`/projects/${project._id}`}>
      View Project
      </Link>
    </div>
  );
}