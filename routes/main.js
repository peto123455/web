const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require('../page/auth');

router.route('/login')
      .get(auth.login)
      .post(passport.authenticate("local", {
            failureRedirect: "/",
            failureFlash: true}), (req, res) => {
                res.send("test");
            });

module.exports = router;