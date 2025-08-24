const express=require('express');
const router=express.Router();

//Insert model
const User=require("../Model/UserModel");


//Insert User Controller
const UserController = require("../Controllers/UserControllers");

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);

//export
module.exports=router;



