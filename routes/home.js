const express = require('express');
const router = express.Router();
const agents = require('../models/agent');

router.get('/',function(req,res){
  res.render('home');
});

module.exports = router;

