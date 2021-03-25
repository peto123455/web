const User = require('./../models/User');
const bcrypt = require('bcrypt');

exports.dashboard = (req, res) => {
    if(res.locals.user && isAdmin(res.locals.user)) res.render('a_dashboard');
    else res.redirect('/login');
}

exports.users = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            const users = await User.find({});

            res.render('a_users', { "users": users });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.userEdit = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            if(!req.query.id) return res.send("No id");

            const euser = await User.findById(req.query.id);

            res.render('a_useredit', { "euser": euser });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.userEditPost = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            const euser = await User.findById(req.body.id);

            euser.username = req.body.username;
            euser.role = req.body.role;

            if(req.body.password) euser.password = bcrypt.hashSync(req.body.password, 5);

            await euser.save();

            res.redirect('/admin/users');
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.userDelete = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            if(!req.query.id) return res.send("No id");

            const euser = await User.findById(req.query.id);

            res.render('a_userdelete', { "euser": euser });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.userDeletePost = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            await User.findByIdAndRemove(req.body.id);

            res.redirect('/admin/users');
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

function isAdmin(user)
{
    return user.role == 3;
}