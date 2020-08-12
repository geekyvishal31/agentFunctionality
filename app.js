const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//mongoose connectivity
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/agentdata').then(db=>{
  console.log('Mongo Connected');
}).catch(error=> console.log("could not connect"+ error));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//initializing session
app.use(session({
  secret: 'vardhaanrajsingh@gmail.com',
  resave: true,
  saveUninitialized: true
}));

//using passport modules
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({"defaultLayout":"layouts"}));
app.set('view engine','handlebars');
app.locals.sTitle = 'Agent feature'; //to have something on all the routes

//route path for a home page
let home = require('./routes/home');
app.use('/',home);

//route path for agent signup page
let signup = require('./routes/agent-signup');
app.use('/agent-signup',signup);

//route path for agent login page
let login = require('./routes/agent-login');
app.use('/agent-login',login);

//route path for agent logout page
let logout = require('./routes/agent-logout');
app.use('/agent-logout',logout);

//route path for client's entry page
let client = require('./routes/client-entry');
app.use('/client-entry',client);

//route path for agent's id page
let agentid = require('./routes/agent-id');
app.use('/agent-id',agentid);

//route path for agent-dashboard page
let agentd = require('./routes/agent-dashboard');
app.use('/agent-dashboard',agentd);

//route path for tutor-entry page
let ctutor = require('./routes/client-tutor');
app.use('/client-tutor',ctutor);

//route path for learner-entry page
let clearner = require('./routes/client-learner');
app.use('/client-learner',clearner);

//route path for agent-profile page
let aProfile = require('./routes/agent-profile');
app.use('/agent-profile',aProfile);

//route path for upload-image page
let upload = require('./routes/upload-image');
app.use('/upload-image',upload);

//route path for total-learner page
let tlearner = require('./routes/total-learner');
app.use('/total-learner',tlearner);

//route path for total-tutor page
let ttutor = require('./routes/total-tutor');
app.use('/total-tutor',ttutor);

const port=8080;
var Server = app.listen(port,(req,res)=>{
    console.log(`listening to port ${port}` );
});
