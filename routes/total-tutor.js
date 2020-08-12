const express = require('express');
const router = express.Router();
const tutors = require('../models/tutor');
const agents = require('../models/agent');

router.get('/',function(req,res){
  
       var agentobjid = req.query.id;
       console.log(agentobjid);
       agents.findById(agentobjid,function(err,agent){
         var agentid = agent.agentId;
          tutors.find({}, function (err,obj) {
            var mytutors=[];
            for(var i=0;i<obj.length;i++){
              if(obj[i].agentId==agentid){
                mytutors.push(obj[i]);
              }
            }
            res.render('total-tutor',{
              agenttutors:mytutors
            });
       });
    });   
});

module.exports = router;

