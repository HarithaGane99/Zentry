const User = require("../Model/UserModel");


//data display
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


//data Insert
const addUsers = async(req,res)=>{
    
    const {name,gmail,age,address}=req.body;
    console.log("Incoming body:", req.body); 

    let users;
    try{
        users = new User({
            name,
            gmail,
            age,
            address
        });
        await users.save();
    }catch(error){
        console.error("Error adding user:", error);
        return res.status(500).json({message:"Internal server error"});
    }

    return res.status(201).json({users});
}

exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;