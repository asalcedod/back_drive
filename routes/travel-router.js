const express = require('express')
const upload = require('./../libs/storage')

const TravelCtrl = require('../controllers/travel-ctrl')

const router = express.Router()

router.post('/travel', upload.none(), TravelCtrl.createTravel)
router.put('/travel/:id', upload.none(), TravelCtrl.updateTravel)
router.delete('/travel/:id', TravelCtrl.deleteTravel)
router.get('/travel/:id', TravelCtrl.getTravelById)
router.get('/travels/:page?/:limit?', TravelCtrl.getTravels)
router.get('/travels_by_driver/:driver/:page?/:limit?', TravelCtrl.getTravelsByDriver)

module.exports = router