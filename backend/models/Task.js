import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "pending"
  },

  priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    dueDate: {
        type: Date,
    },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);