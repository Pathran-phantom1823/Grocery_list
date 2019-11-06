var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1/employees', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var ItemSchema = new mongoose.Schema({
    employee: {
        type: String,
        required:true
        // required: [true, "Please Fill the Name"],
    },
    address: {
        type: String,
        required:true
        // required: [true, "Put Address"]
    },
    email: {
        type: String,
        required:true,
        // required: [true, "Fill up email"],
        unique: true
    },
    description: {
        type: String,
        required:true
        // required: [true, "Fill up description"],
    },
}, { visionkey: "_something" })

var Employee = mongoose.model('Employee', ItemSchema);
module.exports = Employee;