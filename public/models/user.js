var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1/user', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, { visionkey: "_something" })

var Admin = mongoose.model('Admin', UserSchema);
module.exports =Admin;