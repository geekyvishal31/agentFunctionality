const express = require('express');
const router = express.Router();
const agents = require('../models/agent');


router.get('/',function(req,res){
  var agentid = req.query.id;
  agents.findById(agentid, function (err,agent){
    res.render('agent-dashboard',{
      aName:agent.fullName,
      agent_obj_id:agent._id,
      no_tutors:agent.tutors,
      no_learners:agent.learners,
      no_client:agent.tutors+agent.learners
    });
  });
});



module.exports = router;
