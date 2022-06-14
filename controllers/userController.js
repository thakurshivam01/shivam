const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


//Q.1
const createUser = async function (abcd, xyz) {
  let data = abcd.body;
  let savedData = await userModel.create(data);
// console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

//Q.2
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user) {
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
  }
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};
//Q,3  ==============================================================================
const getUserData = async function (req, res) {
  
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails) {
    return res.send({ status: false, msg: "No such user exists" });
  }

  res.send({ status: true, data: userDetails });
};
  
// Q.4======================================================================
const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
};

//Q.5================================================================================
const deleteUser = async function (req, res) {
 

  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if(!user){
    return res.send({msg:"No Such User! Try Again.."})
  }
  
  let userDelete=await userModel.findByIdAndDelete({_id:userId});
  res.send({userDelete})

};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;