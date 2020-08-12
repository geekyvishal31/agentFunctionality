const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const learnerschema = new Schema({
  
  agentId:{
    type: String,
    required:true,
  },
  learnerName:{
    type: String,
    required:true
   },
  learnerEmail:{
    type: String,
    required:true
  },
  mobile:{
     type: Number,
     required:true
   }
  
});

module.exports = mongoose.model('learner',learnerschema); 