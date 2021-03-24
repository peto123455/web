exports.mainPage = (req, res) => {
    if(res.locals.user) res.render('main');
    else res.render('index');
}

exports.profile = (req, res) => {
    if(res.locals.user) res.render('profile');
    else res.render('index');
}