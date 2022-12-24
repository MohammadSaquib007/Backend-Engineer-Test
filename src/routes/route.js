const express = require('express');
const router = express.Router();

const customerController= require('../controllers/customerController')
const cardController= require('../controllers/cardController')


router.post('/createcustomer',customerController.createCustomer)

router.get('/getList',customerController.customerList)

router.delete('/customer/:_id', customerController.deleteCustomer)

router.post('/createcard', cardController.createCard)

router.get('/cardlist', cardController.getCardList)

module.exports = router;