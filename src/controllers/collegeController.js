
const collegeModel = require("../models/collegeModel");
const InternModel = require("../models/InternModel");


const createcollege = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink} = data

        if(!name && !fullName && logoLink) return res.status(400).send({ status: false, message: "Please provide all fileds" })
    
        if (!name)
            return res.status(400).send({ status: false, message: "Please provide with your name" })
    

        if (!fullName)
            return res.status(400).send({ status: false, message: "Please provide with your fullname" })
       

        if (!logoLink)
            return res.status(400).send({ status: false, message: "Please provide LogoLink" })
        logoLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(logoLink)
        if (!logoLink)
            return res.status(400).send({ status: false, message: "Please ensure that you have entered correct url link" })



        if (Object.keys(data).length != 0) {
            let savedData = await collegeModel.create(data)
            let { name, fullName, logoLink, isDeleted } = savedData;
            let answer = {};
            answer.name = name;
            answer.fullName = fullName;
            answer.logoLink = logoLink;
            answer.isDeleted = isDeleted
            return res.status(201).send({ status: true, data: answer })
        }
        else return res.status(400).send({ status: false, message: "Provide with your details" })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getCollegeDetails = async (req, res) => {



    let collegeName = req.query.name;

    let collegeDetails = await collegeModel.findOne({ name: collegeName })

    if (!collegeDetails) return res.status(404).send({ status: false, message: "college not found" })
    let { name, fullName, logoLink, _id } = collegeDetails

    let interns = await InternModel.find({collegeId:_id },{collegeId:0,isDeleted:0,createdAt:0,updatedAt:0,__v:0})
  
    if (!interns) return res.status(404).send({ status: false, message: "no intern form this college" })

    let data = {};
    data.name = name;
    data.fullName = fullName;
    data.logoLink = logoLink;
    data.interns = interns;


    res.status(200).send({ status: true, Data: data })


    // let collegeDetails = await collegeModel.find().populate(collegeId)
    // res.status(200).send({data: collegeDetails})



}


module.exports.createcollege = createcollege
module.exports.getCollegeDetails = getCollegeDetails











