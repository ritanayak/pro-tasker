import mongoose from "mongoose";
import Project from "./Project.js";

export default mongoose.model("Task", new mongoose. Schema ({
    title: String,
    status: { type: String, default: "To Do"},
    Project: {type: mongoose.Schema.Types.ObjectId, ref: "Project" }
}));