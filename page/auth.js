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
        else if(!checkLength(4, 32, req.body.username) || !checkLength(6, 32, req.body.password)) 
            req.flash("error", "Username - 4 to 32 characters long.<br>Password - 6 to 32 characters long.");
        else if(!isValid(req.body.username) || !isValid(req.body.password)) 
            req.flash("error", "Incorrect characters !");
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

function isValid(text) {
    return /^[0-9a-zA-Z_.-]+$/.test(text);
}

function checkLength(minlength, maxlength, text) {
    return (text.length >= minlength && text.length <= maxlength);
}