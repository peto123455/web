const CourseType = require('./../models/CourseType');
const Course = require('./../models/Course');

exports.userPanel = async (req, res, next) => {
    try {
        if(res.locals.user)
        {
            const courses = await Course.find({ 'owner': req.user._id }).populate("course");

            res.render('u_index', { "courses": courses });
        }
        else 
        res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.courses = async (req, res, next) => {
    try {
        if(res.locals.user)
        {
            const courses = await CourseType.find({});

            res.render('courses', { "courses": courses });
        }
        else 
        res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.detail = async (req, res, next) => {
    try {
        if(res.locals.user)
        {
            if(!req.query.id) return res.send("No id");

            const course = await CourseType.findById(req.query.id);

            res.render('courseDetail', { "course": course });
        }
        else 
        res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.courseCreate = (req, res) => {
    if(res.locals.user) res.render('courseCreate');
    else 
    res.redirect('/login');
}

exports.courseCreatePost = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            const course = new CourseType({ "name": req.body.name, "description": req.body.description, "totalRides": req.body.totalRides, "price": req.body.price });
            await course.save();

            res.redirect('/courses');
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.enlist = async (req, res, next) => {
    try {
        if(res.locals.user && isAdmin(res.locals.user))
        {
            const courseType = await CourseType.findById(req.body.id);

            const course = new Course({ "owner": req.user._id, "course": courseType._id, "drivesRemaining": courseType.totalRides });
            await course.save();

            res.redirect('/panel');
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