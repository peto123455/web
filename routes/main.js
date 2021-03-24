const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require('../page/auth');
const page = require('../page/page');

router.route('/')
      .get(page.mainPage);

router.route('/login')
      .get(auth.login)
      .post(passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true}), (req, res) => {
                res.redirect('/');
            });

router.route('/register')
      .get(auth.register)
      .post(auth.registerPost);

router.route('/logout')
      .get(auth.logout);


module.exports = router;