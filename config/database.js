var mongoose = require("mongoose")

var Config = require('./config.json');
var NODE_ENV = process.env.NODE_ENV || 'local';
var uri = `mongodb://${Config[NODE_ENV].database.host}/${Config[NODE_ENV].database.name}`

// 4.12.6
var options = {
  "user" : Config[NODE_ENV].database.user,
  "pass" : Config[NODE_ENV].database.password,
  "poolSize" : 30,
  useMongoClient: true
}

mongoose.set('debug', true);

var connectWithRetry = function() {
  try{
    // v4.0.5
    return mongoose.connect(uri, options, function(err_m){
      if(err_m){
        console.error('==--== error connect MongoDB: ', err_m);
        setTimeout(connectWithRetry, 5000);
      }else{
        console.log('success connect MongoDB');
      }
    });
  }catch(err){
    console.error('==--== error connectWithRetry: ', err);
  }
};
module.exports = connectWithRetry();
