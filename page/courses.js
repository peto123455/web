const CourseType = require('./../models/CourseType');
const Course = require('./../models/Course');
const Paginator = require('./../paginator');
const User = require('../models/User');

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

exports.enlistments = async (req, res, next) => {
    try {
        if(res.locals.user && isInstructor(res.locals.user))
        {
            if(!req.query.id) return res.send("No id");

            const course = await CourseType.findById(req.query.id);
            const courses = await Course.find({ 'course': req.query.id }).populate("owner");

            const page = parseInt(req.query.page) || 1;
            let paginator = new Paginator(courses, page, 5);

            res.render('i_enlistments', { "courses": paginator, "course": course });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.enlisteeEdit = async (req, res, next) => {
    try {
        if(res.locals.user && isInstructor(res.locals.user))
        {
            if(!req.query.id) return res.send("No id");

            const enlisteeCourse = await Course.findById(req.query.id);
            const enlistee = await User.findById(enlisteeCourse.owner);

            res.render('i_enlisteeEdit', { "enlisteeCourse": enlisteeCourse, "enlistee": enlistee });
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.enlisteeEditPost = async (req, res, next) => {
    try {
        if(res.locals.user && isInstructor(res.locals.user))
        {
            let update = {};
            update["theories"] = req.body["theories"];
            update["drives"] = req.body["drives"];
            update["status"] = req.body["status"];

            await Course.findOneAndUpdate({ "_id": req.body["id"] }, { $set: update });

            res.redirect('/courses');
        }
        else res.redirect('/login');
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

exports.course = async (req, res, next) => {
    try {
        if(res.locals.user)
        {
            if(!req.query.id) return res.send("No id");

            const course = await Course.findById(req.query.id).populate("course");;

            res.render('courseEnlistedDetail', { "course": course });
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
            const course = new CourseType({ "name": req.body.name, "description": req.body.description, "totalTheories": req.body.totalTheories, "totalRides": req.body.totalRides, "price": req.body.price });
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

            const course = new Course({ "owner": req.user._id, "course": courseType._id });
            await course.save();

            res.redirect('/panel');
        }
        else res.redirect('/login');
    } catch(e) {
        next(e);
    }
}

exports.removeCourseDelete = async (req, res, next) => {
    try {
        if(res.locals.user && isInstructor(res.locals.user))
        {
            await Course.findByIdAndRemove(req.body.id);
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

function isInstructor(user)
{
    return user.role >= 2;
}