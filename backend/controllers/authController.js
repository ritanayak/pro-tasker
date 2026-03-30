import User from "../models/User.js";
import jwt from "jsonwebtoken";

const getToken = (id) =>
    jwt.sign ({id}, process.env. JWT_SECRET, { expiresIn: "10d"});


export const register = async (req, res) => {
    const user = await User.create(req.body);
    res.json ({ ...user._doc, token: genToken (user._id) });
};

export const login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email});

    if (user && await user.matchPassword (req.body.password)) {
        res.json ({...user._doc, tokon: genToken(user._id)});
    } else {
        res.status(401).json ({ message: "Invalid"});
    }
};
