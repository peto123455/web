const User = require('./../models/User');

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

function isAdmin(user)
{
    return user.role == 3;
}