const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorschema = new Schema({
  
  agentId:{
    type: String,
    required:true,
  },
  tutorName:{
    type: String,
    required:true
   },
  tutorEmail:{
    type: String,
    required:true
  },
  mobile:{
     type: Number,
     required:true
   }
  
});

module.exports = mongoose.model('tutor',tutorschema); 