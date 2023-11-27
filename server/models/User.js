import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    name:{
        type: String,
        required:true
    },
    addarnumber:{
        type:Number,
        require:true
    },
    busid:{
        type:String,
        require:true
    },
    seatnumber:{
        type:Number,
        require: true
    },
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    }
})

const User = model("User", userSchema);

export default User ;