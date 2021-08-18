const express = require('express')
const upload = require('./../libs/storage')
const PassengerCtrl = require('../controllers/passenger-ctrl')

const router = express.Router()

router.post('/passenger', upload.none(), PassengerCtrl.createPassenger)
router.put('/passenger/:id', upload.none(), PassengerCtrl.updatePassenger)
router.delete('/passenger/:id', PassengerCtrl.deletePassenger)
router.get('/passenger/:id', PassengerCtrl.getPassengerById)
router.put('/login_passenger', upload.none(), PassengerCtrl.loginPassenger)
router.get('/passengers/:page?/:limit?', PassengerCtrl.getPassengers)

module.exports = router