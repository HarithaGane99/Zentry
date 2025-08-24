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


//Get by Id
const getById=async (req,res)=>{
    const {id}=req.params;
    let user;
    try{
        user = await User.findById(id);
    }catch(error){
        console.error("Error fetching user:", error);
    }

    //not found
    if(!user){
        return res.status(404).json({message:"No user found"});    
    }

    //Display user
    return res.status(200).json({user});
}

//update user
const updateUser=async (req,res)=>{
    const {id}=req.params;
    const {name,gmail,age,address}=req.body;

    let user;
    try{
        user = await User.findByIdAndUpdate(id,{
            name,
            gmail,
            age,
            address
        },{new:true});
    }catch(error){
        console.error("Error updating user:", error);
        return res.status(500).json({message:"Internal server error"});
    }

    //not found
    if(!user){
        return res.status(404).json({message:"No user found"});    
    }

    //Display user
    return res.status(200).json({user});
}

exports.getAllUsers=getAllUsers;
exports.addUsers=addUsers;
exports.getById=getById;
exports.updateUser=updateUser;