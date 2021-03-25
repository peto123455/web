exports.mainPage = (req, res) => {
    if(res.locals.user) res.redirect('/panel');
    else 
    res.render('index');
}

exports.userPanel = (req, res) => {
    if(res.locals.user) res.render('u_index');
    else res.redirect('/');
}

exports.profile = (req, res) => {
    if(res.locals.user) res.render('profile');
    else res.render('index');
}