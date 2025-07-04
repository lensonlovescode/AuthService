#!/usr/bin/env node

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')
const Authenticate = require('../controllers/Authenticate')

router.post('/signup', AuthController.SignMeUp)
router.post('/login', AuthController.LogMeIn)
router.post('/logout', UserController.LogMeOut)
router.post('/forgotpassword', UserController.ForgotPassword)
router.post('/authcheck', AuthController.Authenticate)


module.exports = router;
