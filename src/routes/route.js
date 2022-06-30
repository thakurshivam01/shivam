const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")
const getController = require("../controllers/collegeController");

//***********router********************** */

router.post("/functionup/colleges", collegeController.createcollege)
router.post("/functionup/interns",internController.createInterns)
router.get("/functionup/collegeDetails", getController.getCollegeDetails)


module.exports = router;