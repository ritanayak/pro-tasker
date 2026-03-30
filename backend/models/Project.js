import mongoose from "mongoose";

export default mongoose.model("Project", new mongoose.Schema({
    name: String,
    description: String,
    user: {type: mongoose. Schema.Types.ObjectId, ref: "User"}
}));