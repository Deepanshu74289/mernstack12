const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({

    name: {type: String,required:true,Trim:true},
    EmailId:{type:String,required:true,Trim:true},
    password:{type:String,required:true,Trim:true},
    OTP : {type:String,required:true,Trim:true}

                                                                             
},
{timestamps:true}
);

module.exports = mongoose.model("user",userSchema);
 