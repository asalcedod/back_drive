const express = require('express')
const upload = require('./../libs/storage')
const DriverCtrl = require('../controllers/driver-ctrl')

const router = express.Router()

router.post('/driver', upload.none(), DriverCtrl.createDriver)
router.put('/driver/:id', upload.none(), DriverCtrl.updateDriver)
router.delete('/driver/:id', DriverCtrl.deleteDriver)
router.get('/driver/:id', DriverCtrl.getDriverById)
router.get('/drivers_distance/:lat/:lng', DriverCtrl.getDriversDistances)
router.put('/login_driver', upload.none(), DriverCtrl.loginDriver)
router.get('/drivers/:page?/:limit?', DriverCtrl.getDrivers)

module.exports = router