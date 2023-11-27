 import  User from './../models/User.js'

 const postUser = async (req, res) => {
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
}

const getUsers =  async (req, res) => {
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
}

const putUser = async (req, res)=>{
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
}

const patchUser = async (req, res)=>{
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
}

const deleteUser = async(req,res)=>{
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
 }


export {postUser, getUsers, putUser, patchUser, deleteUser};