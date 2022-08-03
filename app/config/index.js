const config = require ('./config.js');
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.url = config.url;
db.mongoose=mongoose;
db.user=require('../models/user.model')(mongoose);
module.exports=db;


