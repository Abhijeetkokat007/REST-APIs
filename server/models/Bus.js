import { Schema, model } from "mongoose";

const busSchema = new Schema ({
    busname:{
        type: String,
        require:true
    },
    busnumber:{
        type:String,
        require:true
    },
    totalseat:{
        type:Number,
        require:true
    },
    bustype:{
        type:String,
        enum:['ac', 'non-ac'],
        require: true
    }
})

const Bus = model("bus", busSchema);

export default Bus ;