const express = require("express")
const route = express.Router();
const {createUser,update} = require("../Usercontroller/usercontroller")

route.post("/createUser",createUser);

route.put("/update/:id",update);



module.exports = route;
