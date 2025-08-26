const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const userSchema= new Schema({
  name:{
    type:String,
    required:true
  },
  gmail:{
    type:String,
    required:true,
    unique:true
  },
  age:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

module.exports= mongoose.model(
    'UserModel',//file name
    userSchema //function name
);