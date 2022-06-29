
const collegeModel = require("../models/collegeModel")


const createcollege = async function (req, res) {
    try {
        let data= req.body;
        let {name,fullName,logoLink}=data
        if(!name)
        return res.status(400).send({status:false,msg:"Please provide with your name"})
        name = /^[a-z.A-Z]{2,15}$/.test(name)
        if(!name)
        return res.status(400).send({status:false,msg:"Please use alphabates only and maximum length should be 15"})


        if(!fullName)
        return res.status(400).send({status:false,msg:"Please provide with your fullname"})
        fullName = /^[a-z].A-Z{2,25}$/.test(fullName)
        if(!fullName)
        return res.status(400).send({status:false,msg:"Please use alphabates only and maximum length should be 25"})


        if(!logoLink)
        return res.status(400).send({status:false,msg:"Please provide LogoLink"})
        logoLink= /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(logoLink)
        if(!logoLink)
        return res.status(400).send({status:false,msg:"Please ensure that you have entered correct url link"})
        
    
      
        if (Object.keys(data).length != 0) {
            let savedData = await collegeModel.create(data)
            return res.status(201).send({ status: true, msg: "college created successfully", data: savedData })
        }
        else return res.status(400).send({ status: false, msg: "Provide with your details"})
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.createcollege = createcollege











