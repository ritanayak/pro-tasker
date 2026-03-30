import express from 'express';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import cors from cors;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then (()=> console.log ("DB connected"));

app.get('/', (req, res)=>{
    res.send("API running")

})

app.listen (process.env.PORT || 3000, () =>{

    console.log("Server running");
})