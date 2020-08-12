const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const agents = require('../models/agent');

router.get('/',function(req,res){
  var agentid = req.query.id;
  console.log(agentid);
  uniquenum = uniqid();
  res.render('agent-id',{
    agentid:uniquenum,
    objid: agentid
  });

  agents.update(
    {_id: agentid},
    {agentId : uniquenum },
    {multi:true},
    function(err, numberAffected){
        if (err) {
            throw err;
        } else {
            console.log('database updated');
        }
    });
  
});

module.exports = router;
