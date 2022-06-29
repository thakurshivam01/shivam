const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
// const blogController = require("../controllers/blogController")


router.post("/functionup/colleges", collegeController.createcollege)
// router.post("/functionup/interns",internController.createintern)
module.exports = router;