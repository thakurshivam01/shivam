const internModel = require("../models/InternModel")
const mongoose = require("mongoose");
const { getCollegeDetails } = require("./collegeController");
const collegeModel = require("../models/collegeModel");
const { emit } = require("../models/collegeModel");

const createInterns = async (req, res) =>  {

    try {

        let data = req.body;
        let { name, email, mobile, collegeName } = data;

        if (!name && !email && !mobile && !collegeName) return res.status(400)

        if (!name) return res.status(400).send({ status: false, message: "Please provide with your name" })

        if (!email) return res.status(400).send({ status: false, message: "Please provide with your emailId" })

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Please fill a valid email address " })

        if (!mobile) return res.status(400).send({ status: false, message: "Please provide mobile number" })

        let college = await collegeModel.findOne({ name: collegeName });
        
        if (!college) { res.status(404).send({ status: false, msg: "no such college exist" }) }

        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(mobile)) return res.status(400).send({ status: false, message: "Please provide valid moblie number" })

        const isPresentMobile = await internModel.findOne({ mobile });

        if (isPresentMobile) return res.status(400).send({ status: false, msg: "AlReady Present Mobile Number" })
        

        const isPresentEmail = await internModel.findOne({ email });

        if (isPresentEmail) return res.status(400).send({ status: false, msg: "AlReady Present Emaild" })
      
        let id = college._id
        // console.log(college)
        // console.log(id)
        let daata = {};
        daata.name = name;
        daata.email = email;
        daata.mobile = mobile;
        daata.collegeId = id;

        let save = await internModel.create(daata)


        let answer = {};
        answer.isDeleted = save.isDeleted;
        answer.name = save.name;
        answer.email = save.email;
        answer.mobile = save.mobile
        answer.collegeId = save.collegeId



        return res.status(201).send({ status: true, data: answer })

        // return res.status(400).send({ status: false, message: "Provide with your details" })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

   



module.exports.createInterns = createInterns
