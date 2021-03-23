const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/User');

module.exports = (passport) => {
    passport.use(
      new LocalStrategy({ 
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      }, (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err)
            return done(err);
          else if (!user || user.password != password /*!bcrypt.compareSync(password, user.password)*/)
            return done(null, false, req.flash("error", "Invalid username/password."));
          else
            return done(null, user);
        })
      })
    );
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });
}