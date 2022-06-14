const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware=require("../controllers/middleware/auth")

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",middleware.mid, userController.getUserData)

router.put("/users/:userId",middleware.mid, userController.updateUser)

router.delete("/delUser/:userId",middleware.mid,userController.deleteUser)

module.exports = router;