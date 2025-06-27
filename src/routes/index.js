#!/usr/bin/env node

const express = require('express');
const UserController = reqire('../controllers/UserController');

const router = express.Router();

router.post('/signup', UserController.SignMeUp)
router.post('/login', UserController.LogMeIn)
router.post('/logout', UserController.LogMeOut)
router.post('/forgotpassword', UserController.ForgotPassword)

module.export = router;
