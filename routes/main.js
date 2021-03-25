const express = require('express');
const router = express.Router();

const passport = require('passport')

const auth = require('../page/auth');
const page = require('../page/page');
const admin = require('../page/admin');

router.route('/')
      .get(page.mainPage);

router.route('/panel')
      .get(page.userPanel);

router.route('/profile')
      .get(page.profile);

router.route('/login')
      .get(auth.login)
      .post(passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true}), (req, res) => {
                res.redirect('/panel');
            });

router.route('/register')
      .get(auth.register)
      .post(auth.registerPost);

router.route('/logout')
      .get(auth.logout);

router.route('/admin')
      .get(admin.dashboard);

router.route('/admin/users')
      .get(admin.users);

router.route('/admin/useredit')
      .get(admin.userEdit)
      .post(admin.userEditPost);

router.route('/admin/userdelete')
      .get(admin.userDelete)
      .post(admin.userDeletePost);

module.exports = router;