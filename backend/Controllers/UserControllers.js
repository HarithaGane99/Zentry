const User = require("../Model/UserModel");

const getAllUsers=async (req,res)=>{
    let users;
    try{
        users = await User.find();
    }catch(error){
        console.error("Error fetching users:", error);
    }

    //not found
    if(!users){
        return res.status(404).json({message:"No users found"});    
    }

    //Display users
    return res.status(200).json({users});
}

exports.getAllUsers=getAllUsers;