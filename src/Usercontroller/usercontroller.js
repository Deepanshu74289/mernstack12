const { validname, validemail, validpassword } = require("../allvalidation/allvalidation.js");

const userModel = require("../Model/Usermodel.js");
const bycript = require("bcrypt")
const {otpsender} = require("../Nodemailer/nodemailer.js")

exports.createUser = async (req, res) => {
    const data = req.body;
    const { name, EmailId, password } = data;
    const randomOTP = Math.floor(1000+Math.random()*9000);

    if (!name) {
        return res.status(400).send({ status: false, msg: "Please provide a name" });
    }
    if (!validname(name)) {
        return res.status(400).send({ status: false, msg: "Name is not valid" });
    }

    if (!EmailId) {
        return res.status(400).send({ status: false, msg: "Please provide a valid EmailId" });
    }
    if (!validemail(EmailId)) {
        return res.status(400).send({ status: false, msg: "Please provide a valid EmailId" });
    }

    if (!password) {
        return res.status(400).send({ status: false, msg: "Please provide a valid password" });
    }
    if (!validpassword(password)) {
        return res.status(400).send({ status: false, msg: "Please provide a strong password" });
    }

    const existinguser = await userModel.findOne({ EmailId });
    if (existinguser) {
        return res.status(400).send({ status: false, msg: "EmailId is already registered" });
    }

    data.OTP =randomOTP;
    const hashpassword = await bycript.hash(password,5);
    data.password = hashpassword;
    otpsender(name,EmailId,randomOTP)



    const userdb = await userModel.create(data);
    return res.status(201).send({ status: true, msg: "Data created successfully", data: userdb });
};





// show  All data in data base 

exports.Showall = async(req,res)=>{

    try { 
        const userdata = await userModel.find ()
        if (!userdata || userdata.length === 0){
            return res.status(404).json({ status:"false",msg:"data not found"})

        }
        return res.status(200).json({status:true, data:userdata})
        
    }
catch(error){
    return res.status (500).json({status:false, msg:"error from server", error:error.msg})

}
}


// find by id 

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const userexist = await userModel.findById(id);
        if (!userexist) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }

        const updateddata = await userModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(200).json({ status: true, msg: "User updated successfully", data: updateddata });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error from server", error: error.message });
    }
};


