import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const createProject = async (req, res) => {
    const project = await Project.create({
    ...req.body,
    user: req.user._id

    });

    res.json(project);
};

export const getProjects = async (req, res) => {
    const projects = await Project.find ({ user:req.user._id});
    res.json(projects);
};


// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    //  Check ownership
    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    //  Delete all tasks under this project
    await Task.deleteMany({ project: project._id });

    //  Delete project
    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};