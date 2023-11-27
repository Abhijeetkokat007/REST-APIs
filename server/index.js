import Express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Bus from "./models/Bus.js";
import User from "./models/User.js";
import {postUser, getUsers, putUser, patchUser, deleteUser} from './Controllers/user.js';
import {getBuses, postv2bus, postv1bus} from './Controllers/bus.js';
import helth from "./Controllers/helth.js";

const app = Express();
app.use(Express.json());

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        if (connection) {
            console.log('mongoDB connected')
        }
    } catch (e) {
        console.log(e.message)
        console.log('MongoDB not connected')
    }
}

app.post("/api/v1/bus", postv1bus)

app.post("/api/v2/bus", postv2bus)

app.get("/api/buses", getBuses)

app.post("/api/user", postUser)

app.get("/api/users", getUsers)

app.put("/api/user/:id", putUser) 

app.patch("/api/user/:id", patchUser ) 

app.delete("/api/user/:id", deleteUser)

app.get("/api/helth", helth )


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is runing ${PORT}`)
    connectDB()
})