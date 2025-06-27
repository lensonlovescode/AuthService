#!/usr/bin/env node

const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')

const router = express.Router();

router.post('/signup', AuthController.SignMeUp)
router.post('/login', AuthController.LogMeIn)
router.post('/logout', UserController.LogMeOut)
router.post('/forgotpassword', UserController.ForgotPassword)

module.exports = router;
