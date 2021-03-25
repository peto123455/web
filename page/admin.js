const User = require('./../models/User');
const bcrypt = require('bcrypt');
const Paginator = require('./../paginator')

exports.dashboard = (req, res) => {
    if(res.locals.user && isAdmin(res.locals.user)) res.render('a_dashboard');
    else res.redirect('/login');
}

exports.users = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            const users = await User.find({});

            const page = parseInt(req.query.page) || 1;
            let paginator = new Paginator(users, page, 5);

            res.render('a_users', { "users": paginator });
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
            let update = {};
            update["username"] = req.body["username"];
            update["role"] = req.body["role"];
            if(req.body.password) update["password"] = bcrypt.hashSync(req.body["password"], 5);

            await User.findOneAndUpdate({ "_id": req.body["id"] }, { $set: update });

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
            res.status(200).json({"status": "OK"});
            //res.redirect('/admin/users');
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