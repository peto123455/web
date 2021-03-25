const User = require('./../models/User');
const bcrypt = require('bcrypt');



exports.login = (req, res) => {
    if(res.locals.user) res.redirect('/panel');
    else res.render('login');
}

exports.register = (req, res) => {
    if(res.locals.user) res.redirect('/panel');
    else res.render('register');
}

exports.registerPost = async (req, res, next) => {
    try {
        if(await User.findOne({ username: req.body.username })) 
            req.flash("error", "User already exists !");
        else if(req.body.password != req.body.passwordRepeat) 
            req.flash("error", "Passwords don't match !");
        else 
        {
            const hash = await bcrypt.hash(req.body.password, 5);
            const user = new User({ "username": req.body.username, "password": hash });
            await user.save();
            req.flash("success", "Account successfully created ! You can now <a href=\"/login\">log in<\/a>");
        }

        res.redirect('/register');
    } catch(e) {
        next(e);
    }
}

exports.logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) console.log(err);
        res.redirect('/');
    });
}