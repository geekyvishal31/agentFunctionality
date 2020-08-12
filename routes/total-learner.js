const express = require('express');
const router = express.Router();
const learners = require('../models/learner');
const agents = require('../models/agent');

router.get('/',function(req,res){
  
  var agentobjid = req.query.id;
  agents.findById(agentobjid,function(err,agent){
    var agentid = agent.agentId;
     learners.find({}, function (err,obj) {
       var mylearners=[];
       for(var i=0;i<obj.length;i++){
         if(obj[i].agentId==agentid){
           mylearners.push(obj[i]);
         }
       }
       res.render('total-learner',{
         agentlearners:mylearners
       });
  });
});   
});

module.exports = router;


