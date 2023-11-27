import { Schema, model } from "mongoose";

const busSchema = new Schema ({
    busname:{
        type: String,
        required:true
    },
    busnumber:{
        type:String,
        required:true
    },
    totalseat:{
        type:Number,
        required:true
    },
    bustype:{
        type:String,
        enum:['ac', 'non-ac'],
        required: true
    }
})

const Bus = model("Bus", busSchema);

export default Bus ;