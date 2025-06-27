#!/usr/bin/env node

class UserController {
  static async LogMeOut(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }

  static async ForgotPassword(req, res) {
    res.status(200).json({ message: "" });
  }
}

module.exports = UserController;
