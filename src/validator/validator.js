

const mongoose = require("mongoose");

const isValidObjectId = function (Id) {
  return mongoose.Types.ObjectId.isValid(Id);
};

const validatePhone = function (phone) {
    var re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (typeof phone == "string") {
      return re.test(phone.trim());
    } else {
      return re.test(phone);
    }
  };
  
  const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(email);
    return regex;
  };

  //------------------------validation functions----------------------------------------------------------


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

module.exports={isValidEmail,isValid,isValidRequestBody,validatePhone,isValidObjectId}

