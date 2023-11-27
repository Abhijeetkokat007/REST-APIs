import Express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Bus from "./models/Bus.js";
import User from "./models/User.js";

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

app.post("/api/v1/bus", async (req, res) => {
    const { busname, busnumber, totalseat, type } = req.body;

    const bus = new Bus({
        busname,
        busnumber,
        type,
        totalseat
    })

    try {
        const savedata = await bus.save();
        res.status(201).json({
            success: true,
            data: savedata,
            message: "Bus saved"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})


app.post("/api/v2/bus", async (req, res) => {
    const { busname, busnumber, totalseat, bustype } = req.body;

    const bus = new Bus({
        busname,
        busnumber,
        bustype,
        totalseat
    })

    try {
        const savedata = await bus.save();
        res.status(201).json({
            success: true,
            data: savedata,
            message: "Bus saved"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

app.get("/api/buses", async (req, res) => {
    try {
        const allBuses = await Bus.find();
        return res.status(200).json({
            success: true,
            data: allBuses,
            message: "successfull all Bus fatched"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

app.post("/api/user", async (req, res) => {
    const { name, busid, seatnumber, from, to, addarnumber } = req.body;

    const user = new User({
        name,
        busid,
        seatnumber,
        from,
        to,
        addarnumber
    })

    try {
        const datasave = await user.save();
        res.status(201).json({
            success: true,
            data: datasave,
            message: "user saved"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

app.get("/api/users", async (req, res) => {
    try {
        const userdata = await User.find();
        return res.status(200).json({
            success: true,
            data:userdata,
            message: "successfull all User fatched"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

app.put("/api/user/:id", async (req, res)=>{
    const {id} = req.params;
    const { name,busid,seatnumber,from,to,addarnumber}= req.body;

    await User.updateOne({_id: id},{
        $set:{
            name,
            busid,
            seatnumber,
            from,
            to,
            addarnumber
        }
    })
    const updatuser = await User.findOne({ _id: id })

    res.status(200).json({
        success: "true",
        data: updatuser,
        message: "User Updated successfully..!"
    })
}) 

app.patch("/api/user/:id", async (req, res)=>{
    const {id} = req.params;
    const { name,busid,seatnumber,from,to,addarnumber}= req.body;

    await User.updateOne({_id: id},{
        $set:{
            name,
            busid,
            seatnumber,
            from,
            to,
            addarnumber
        }
    })
    const updatuser = await User.findOne({ _id: id })

    res.status(200).json({
        success: "true",
        data: updatuser,
        message: "User Updated successfully..!"
    })
}) 

app.delete("/api/user/:id", async(req,res)=>{
   try{
    const {id} = req.params;
    await User.deleteOne({ _id: id })

    res.status(200).json({
        success: "true",
       message: "Data delete succesfully..!"
    })
   } catch(e){
   console.log(e.message)
   }
})




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is runing ${PORT}`)
    connectDB()
})