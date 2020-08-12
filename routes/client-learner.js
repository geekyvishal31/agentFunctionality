const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const learners = require('../models/learner');
const agents = require('../models/agent');

router.get('/',function(req,res){
  var oid = req.query.agentid;
  res.render('learner-entry-form',{
     ag_id:oid
  });
});

router.post('/',(req,res)=>{
  let errors = [];
    if(!req.body.agentId){
      errors.push({message:'please enter your agent ID'});
      console.log('agent ID error');
      }
    if(!req.body.learnerName){
        errors.push({message:'please enter a learner name'});
        console.log('learner name error');
      }
    if(!req.body.learnerEmail){
      errors.push({message:'please enter a learner email'});
      console.log('email error');
    }
    if(!req.body.mobile){
      errors.push({message:'please enter a mobile number'});
      console.log('mobile number error');
    }
    
  if (errors.length > 0) {
     console.log(errors);
    res.render('learner-entry-form', {

        errors: errors,
        Name: req.body.learnerName,
        Email: req.body.learnerEmail,
    });
  } else {
    learners.findOne({email:req.body.learnerEmail}).then(learner=>{
      if(!learner){

          const newlearner = new learners({

              learnerName: req.body.learnerName,
              mobile: req.body.mobile,
              agentId:req.body.agentId,
              learnerEmail: req.body.learnerEmail,
          });

          bcrypt.genSalt(10, (err, salt)=>{

              bcrypt.hash(newlearner.agentId,salt,(err,hash)=>{  //this newUser.password is coming from the form  ie req.body.password and we are hashing it.

                  //newlearner.agentId = hash;     //converting the property value that is password into hash password

                  newlearner.save().then(savedLearner=>{
                      var aid=req.body.agentId;
                      agents.findOne({agentId: aid}, function(err,obj) { 
                        var objid = obj._id;
                        agents.findOneAndUpdate({_id :objid}, {$inc : {'learners' : 1}}, {new: true },function(err, response){});
                         console.log('learners:',obj.learners);
                        res.render( 'proceedlearner',{
                           oid:objid
                        });
                      });
                      
                      // req.flash('success_message','you are registered and can login now');
                      console.log('learner saved');
                      
                  });

              });

          });
      }
  });

  }

});

module.exports = router;

