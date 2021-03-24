const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const session  = require("express-session");
const MongoStore = require('connect-mongo')(session);

require("./passport")(passport);

mongoose.connect("mongodb+srv://bot:BoTlOgIn123451@bot.wbmoo.mongodb.net/bot?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    family: 4 })
.then(() => {
    console.log("Database is connected.");
})
.catch((err) => {
    console.log("Connection unsuccessful.");
    console.log(err);
});

const sessionMiddleware = session({
    secret: "uzhjgvhzjmuggnbmudjsrik",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
    })
});

app.set('view engine', 'ejs');

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong you retard.');
});

app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(require('./globaluser'));
app.use('/', require('./routes/main'));

app.listen(80, () => {
    console.log("Server started !");
});