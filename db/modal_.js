const mongoose = require('mongoose');
const usrSchema = new mongoose.Schema({
  party : {
    type :String,
    rquired : true
  },account:{
    type : String
  },
  contact : {
    type :Number
  },ammount : {
    type : Number,
    required : true
  },date : {
    type : String,
    required : true
  },duePayment:{
    type : String
  }
})

const Usr = mongoose.model('ledger',usrSchema);


module.exports = Usr;
