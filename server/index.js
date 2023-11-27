import  Express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Bus from "./models/Bus.js";

const app = Express();
app.use(Express.json());

const connectDB = async ()=>{
 try{
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    if (connection) {
      console.log('mongoDB connected')
    }
 } catch(e){
    confirm.log(e.message)
    console.log('MongoDB not connected')
 }
}


app.post("/api/bus", async (req, res) =>{
    const {busname, busnumber, totalseat, bustype}= req.body;

    const bus = new Bus({
        busname,
        busnumber,
        bustype,
        totalseat
    })

   try{
    const savedata = await bus.save();
    res.status(201).json({
        success:true,
        data: savedata,
        message:"Bus saved"
    })
   } catch(e) {
    return res.json({
        success: false,
        message: e.message
    })
   }
})

app.get("/api/Buses", async (req, res) =>{
  try{
    const allBuses = await Bus.find();
    return res.status(200).json({
        success:true,
        data: allBuses,
        message: "successfull all Bus fatched"
    })
  } catch(e){
    return res.json({
        success: false,
        message: e.message
    })
  }
})

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`server is runing ${PORT}`)
    connectDB()
})