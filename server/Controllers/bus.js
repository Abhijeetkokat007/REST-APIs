import  Bus from './../models/Bus.js';

const getBuses = async (req, res) => {
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
}

const postv2bus = async (req, res) => {
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
}

const postv1bus = async (req, res) => {
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
}

export {getBuses, postv2bus , postv1bus}