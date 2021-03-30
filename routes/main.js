const express = require('express');
const router = express.Router();

const passport = require('passport')

const auth = require('../page/auth');
const page = require('../page/page');
const admin = require('../page/admin');
const courses = require('../page/courses');

router.route('/')
      .get(page.mainPage);

router.route('/courses')
      .get(courses.courses);

router.route('/courses/create')
      .get(courses.courseCreate)
      .post(courses.courseCreatePost);

router.route('/courses/detail')
      .get(courses.detail)
      .post(courses.enlist);

router.route('/panel')
      .get(courses.userPanel);

router.route('/profile')
      .get(page.profile)
      .put(page.passwordChange);

router.route('/profile/edit')
      .get(page.profileEdit)
      .post(page.profileEditPost);

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
      .get(admin.users)
      .delete(admin.userDeletePost);

router.route('/admin/useredit')
      .get(admin.userEdit)
      .post(admin.userEditPost);

router.route('/admin/userdelete')
      .get(admin.userDelete);
      //.post(admin.userDeletePost);

module.exports = router;