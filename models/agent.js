const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentschema = new Schema({
  
     fullName:{
       type: String,
       required:true
      },
     mobile:{
        type: Number,
        required:true
      },
     email:{
        type: String,
        required:true
      },
     aadhar:{
        type: Number,
        required:true
      },
     password:{
        type: String,
        required:true
      },
     agentId:{
      type: String,
      required:true,
      default:1
    },
    learners:{
      type:Number,
      required:true,
      default:0
    },
    tutors:{
      type:Number,
      required:true,
      default:0
    }

});

module.exports = mongoose.model('agent',agentschema); 