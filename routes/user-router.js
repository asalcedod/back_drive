const express = require('express')
const upload = require('./../libs/storage')
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', upload.none(), UserCtrl.createUser)
router.put('/user/:id', upload.none(), UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.put('/login', upload.none(), UserCtrl.loginUser)
router.get('/users/:page?/:limit?', UserCtrl.getUsers)

module.exports = router