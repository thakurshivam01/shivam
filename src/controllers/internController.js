const internModel = require("../models/InternModel")
const mongoose = require("mongoose");
const collegeModel = require("../models/collegeModel");

const createInterns = async (req, res) => {

    try {

        let data = req.body;
        let { name, email, mobile, collegeName } = data;

        if(!name && !email && !mobile && !collegeName) return res.status(400).send({ status: false, message: "Please provide all fileds" })

        if (!name) return res.status(400).send({ status: false, message: "Please provide with your name" })

        if (!email) return res.status(400).send({ status: false, message: "Please provide with your emailId" })

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Please fill a valid email address " })

        if (!mobile) return res.status(400).send({ status: false, message: "Please provide mobile number" })

        mobile = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(mobile);

        if (!mobile) return res.status(400).send({ status: false, message: "Please provide valid moblie number" })

        if (!collegeName) return res.status(400).send({ status: false, message: "Please provide collegeId" })

        if (!mongoose.isValidObjectId(collegeName)) return res.status(400).send({ status: false, message: "please enter valid collegeId" });
      

        if (Object.keys(data).length != 0) {

            let college = await collegeModel.find({name: collegeName})
            let {collegeId, name, fullName }= college
            let answer
         // let savedData = await internModel.create(data)
           
           // const {isDeleted,name,email,mobile,collegeName} = savedData;

            let answer = {}

            answer.isDeleted = isDeleted;
            answer.name = name;
            answer.email = email;
            answer.mobile = mobile;
            answer.collegeName = collegeName;
            
            return res.status(201).send({ status: true, data: answer })
        }
        else return res.status(400).send({ status: false, message: "Provide with your details" })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports.createInterns = createInterns
