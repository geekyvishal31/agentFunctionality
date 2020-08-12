const express = require('express');
const router = express.Router();
const passport = require('passport');
const agents = require('../models/agent');

router.get('/',function(req,res){
  if(!req.agents){
    req.logout();
    //res.redirect('/');
  }else{
    res.send('not working');
  }
  
});
  

module.exports = router;

