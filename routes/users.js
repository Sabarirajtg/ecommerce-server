const express = require("express");
const UserService = require('../services/UserService')
const router = express.Router();


// Defining methods
router.post('/', UserService.addUser);

router.get('/', UserService.getAllUsers);

router.get('/:id', UserService.getUser);

router.put('/:id', UserService.updateUser);

router.delete('/:id', UserService.deleteUser);

router.post('/login',UserService.login);

router.post('/:id',UserService.addPurchase);


module.exports = router;
