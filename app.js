const express = require('express');
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const path = require('path');

require("./config/passport")(passport)

const {forceLogin} = require("./config/auth.js")

const dbUrl = "mongodb://localhost/qover";
mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => {
  console.log("Database created!");
  User.findOne({username : 'Qover'}).exec((err,user)=>{
    if(!user) {
       const newUser = new User({
         username : 'Qover',
         password : 'Ninja'
      });
      newUser.save()
    }
  })
  console.log('Connection established')
})
.catch((err)=> console.log(err));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(expressEjsLayout);
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
})

app.get('/', forceLogin, (req, res) => {
  res.render('qoverme');
});

app.use('/users', require('./routes/users'));
app.use('/policies', require('./routes/policies'));

app.listen(8000, () => {
  console.log('Server is running at port 8000');
});