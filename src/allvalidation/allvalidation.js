exports.validname = (name)=>{
    const validnameregex =/^[A-Za-z][A-Za-z\s\-]*$/
    return validnameregex.test(name)


}

exports.validemail =(emailid)=>{
    const validemailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return validemailregex.test(emailid)

}

exports.validpassword =(password)=>{
    const validpasswordregax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return validpasswordregax.test(password)
}