exports.mainPage = (req, res) => {
    if(res.locals.user) res.redirect('/panel');
    else 
    res.render('index');
}

exports.userPanel = (req, res) => {
    if(res.locals.user) res.render('u_index');
    else res.redirect('/');
}

exports.profile = async (req, res, next) => {
    try {
        if(res.locals.user)
        {
            if(!req.query.id) return res.send("No id");

            const puser = await User.findById(req.query.id);

            res.render('profile', { "puser": puser });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}