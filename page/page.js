const bcrypt = require('bcrypt');
const { render } = require('ejs');

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
            let puser;

            if(!req.query.id) puser = req.user;
            else puser = await User.findById(req.query.id);


            res.render('profile', { "puser": puser });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.profileEdit = (req, res) => {
    if(req.user)
    {
        res.render('u_profileedit');
    }
    else res.redirect('/login');
}

exports.profileEditPost = async (req, res, next) => {
    try {
        if(req.user)
        {
            let update = {};
            update["avatar"] = req.body["avatar"];
            update["email"] = req.body["email"];

            await User.findOneAndUpdate({ "_id": req.user._id }, { $set: update });

            res.redirect('/admin/users');
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.passwordChange = async (req, res, next) => {
    try {
        if(req.user)
        {
            if (!req.body["password"] || !req.body["oldPassword"] || !req.body["repeatPassword"]) return res.status(400).json({ "message": "Something went wrong !" });
            else if(!bcrypt.compareSync(req.body["oldPassword"], req.user.password)) return res.status(400).json({ "message": "Incorrect old password !" });
            else if(req.body["password"] != String(req.body["repeatPassword"])) return res.status(400).json({ "message": "Passwords do not match !" });

            let update = {};
            update["password"] = bcrypt.hashSync(req.body["password"], 5);

            await User.findOneAndUpdate({ "_id": req.user._id }, { $set: update });

            res.status(200).json({"status": "OK"});
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}