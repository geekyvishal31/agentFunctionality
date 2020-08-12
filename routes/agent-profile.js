const express = require('express');
const router = express.Router();
const agents = require('../models/agent');

router.get('/',(req,res)=>{
     var agob_id = req.query.id;
     agents.findById(agob_id, function (err, obj) {
     var ag_name = obj.fullName;
      res.render('agent-profile',{
        agentname:ag_name,
      });
    });

     
});

module.exports = router;

