const User = require('./../models/User');
const bcrypt = require('bcrypt');



exports.login = (req, res) => {
    res.render('login');
}

exports.register = (req, res) => {
    res.render('register');
}

exports.registerPost = async (req, res) => {
    if(await User.findOne({ username: req.body.username })) return;
    else if(req.body.password != req.body.passwordRepeat) return;

    //const user = new User({ "username": req.body.username, "password": bcrypt.hashSync(req.body.password, 5) });

    await bcrypt.hash(req.body.password, 5, async (err, hash) => {
        const user = new User({ "username": req.body.username, "password": hash });
        await user.save();
    })

    res.redirect('/login');
}