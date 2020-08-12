const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

router.get('/',(req,res)=>{
     res.send("will work shortly");
});

module.exports = router;