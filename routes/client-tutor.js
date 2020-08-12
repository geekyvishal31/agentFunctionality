const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const tutors = require('../models/tutor');
const agents = require('../models/agent');

router.get('/',function(req,res){
  res.render('tutor-entry-form');
});

router.post('/',(req,res)=>{
  let errors = [];
    if(!req.body.agentId){
      errors.push({message:'please enter your agent ID'});
      console.log('agent ID error');
      }
    if(!req.body.tutorName){
        errors.push({message:'please enter a tutor name'});
        console.log('tutor name error');
      }
    if(!req.body.tutorEmail){
      errors.push({message:'please enter a tutor email'});
      console.log('email error');
    }
    if(!req.body.mobile){
      errors.push({message:'please enter a mobile number'});
      console.log('mobile number error');
    }
    
    

  if (errors.length > 0) {
     console.log(errors);
    res.render('tutor-entry-form', {

        errors: errors,
        Name: req.body.tutorName,
        Email: req.body.tutorEmail,
    });
  } else {
    tutors.findOne({email:req.body.tutorEmail}).then(tutor=>{
      if(!tutor){

          const newtutor = new tutors({

              tutorName: req.body.tutorName,
              mobile: req.body.mobile,
              agentId:req.body.agentId,
              tutorEmail: req.body.tutorEmail,
          });

          bcrypt.genSalt(10, (err, salt)=>{

              bcrypt.hash(newtutor.agentId,salt,(err,hash)=>{  //this newUser.password is coming from the form  ie req.body.password and we are hashing it.

                  //newtutor.agentId = hash;     //converting the property value that is password into hash password

                  newtutor.save().then(savedTutor=>{
                    var aid=req.body.agentId;
                      agents.findOne({agentId: aid}, function(err,obj) { 
                        var objid = obj._id;
                        agents.findOneAndUpdate({_id :objid}, {$inc : {'tutors' : 1}},{new: true },function(err, response){});
                        console.log('tutors:',obj.tutors);
                        res.render( 'proceedtutor',{
                           oid:objid
                        });
                      });

                      // req.flash('success_message','you are registered and can login now');
                      console.log('tutor saved');
                  });

              });

          });
      }
  });

  }

});

module.exports = router;

