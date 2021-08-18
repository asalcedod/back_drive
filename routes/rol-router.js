const express = require('express')
const upload = require('./../libs/storage')

const RolCtrl = require('../controllers/rol-ctrl')

const router = express.Router()

router.post('/rol', upload.none(), RolCtrl.createRol)
router.put('/rol/:id', upload.none(), RolCtrl.updateRol)
router.delete('/rol/:id', RolCtrl.deleteRol)
router.get('/rol/:id', RolCtrl.getRolById)
router.get('/rols/:page?/:limit?', RolCtrl.getRols)

module.exports = router