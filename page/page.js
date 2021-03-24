exports.mainPage = (req, res) => {
    if(res.locals.user) res.render('main');
    else res.render('index');
}