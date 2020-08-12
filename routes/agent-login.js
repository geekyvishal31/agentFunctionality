const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const agents = require('../models/agent');

router.get('/',function(req,res){
  res.render('agent-login');

});
  passport.use(new LocalStrategy({usernameField:'agentId'},(agentId,password,done)=>{   //by default the passport verifies the username and we need to verify the email
    //so we need to overwrite certain code to make it authenticate using email
           console.log('inside findOne ');
           agents.findOne({agentId:agentId}).then(user=>{
                 console.log(user.fullName);
                 if(!user)return done(null,false);
                     console.log('before compare')
                 bcrypt.compare(password,user.password,(err,matched)=>{
                     if(err) return err;
                     if(matched){
                        console.log('logged in');
                        return done(null,user);
                      }else{
                        console.log('incorrect password');
                        return done(null,false);
                      }
                  });
             });
   })) ;
      passport.serializeUser(function(user,done){
          done(null,user.id);
     });
      passport.deserializeUser(function(id,done){
         agents.findById(id,function(err,user){
done(err,user);
       });
   });
router.post('/',
passport.authenticate('local'),
  function (req,res){  
    var aid = req.body.agentId;
    agents.findOne({agentId: aid}, function(err,obj) { 
    res.render( 'successlogin',{
       aName:obj.fullName,
       oid:obj._id
    });
  });
  
     });//(req,res,next)



module.exports = router;
