const customerModel = require('../models/customerModel')
const { v4: uuidv4 } = require('uuid');
const {isValidEmail,isValid,isValidRequestBody,validatePhone}=require('../validator/validator')

//================================ Create new customer==================================
const createCustomer = async (req, res) => {
    try {
        let requestBody = req.body;
        if(!isValidRequestBody(requestBody)) return res.status(400).send({status:false,message:"plz provide requestBody"})
        let {
            firstName,
            lastName,
            mobileNumber,
            DOB,
            emailID,
            address,
            customerID,
            status
        } = requestBody

        if(!isValid(firstName)) return res.status(400).send({status:false,message:"plz fill first Name"})
        if(!isValid(lastName)) return res.status(400).send({status:false,message:"plz fill last Name"})
        if(!isValid(mobileNumber)) return res.status(400).send({status:false,message:"plz fill Mobile Number"})
        const isMObileNumberAleadyUsed = await customerModel.findOne({ mobileNumber })
        if (isMObileNumberAleadyUsed) {
            return res.status(400).send({
                status: false,
                message: `${mobileNumber} is already in use, Please try a new phone number.`
            })
        }
        if (!validatePhone(mobileNumber)) return res.status(400).send({ status: false, message: "mobileNumber number must be a valid Indian number." })


        if(!isValid(DOB)) return res.status(400).send({status:false,message:"plz fill DOB"})
        if(!isValid(emailID)) return res.status(400).send({status:false,message:"plz fill EmailID"})

        const isEmailAleadyUsed = await customerModel.findOne({ emailID })
        if (isEmailAleadyUsed) {
            return res.status(400).send({
                status: false, message: `${emailID} is alraedy in use. Please try another email Id.`
            })
        }

        if (!isValidEmail(emailID))
        return res.status(400).send({ status: false, message: "Invalid Email id." })


        if(!isValid(address)) return res.status(400).send({status:false,message:"plz fill Address"})
        if(!isValid(status)) return res.status(400).send({status:false,message:"plz fill status"})
       
        let uuid = uuidv4()
        const customerData = {
            firstName,
            lastName,
            mobileNumber,
            DOB,
            emailID,
            address,
            customerID: uuid,
            status
        }

        savedData = await customerModel.create(customerData)
        return res.status(201).send({ status: true, message: "customer successfully created", data: savedData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//=================================GetAPI============================================

const customerList = async function (req, res) {
    try {
       let list = await customerModel.find({ status: "ACTIVE" })
        return res.status(200).send({ status: true, message: "customer list", data: list })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}


//==================================deleteAPI=================================
const deleteCustomer = async function (req, res) {
    try {
        let customerID = req.params._id 

        let checkCustomer = await customerModel.findOne({ _id: customerID  });

        if (!checkCustomer) {
          return res.status(404).send({ status: false, msg: `please provide valid ${customerID}`});
        }
     
       let deletedData = await customerModel.findOneAndUpdate({ _id: customerID }, { status: "INACTIVE", isDeleted: true },{new:true} )
        return res.status(200).send({ status: true, message: "successfully deleted", data: deletedData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createCustomer, customerList, deleteCustomer }