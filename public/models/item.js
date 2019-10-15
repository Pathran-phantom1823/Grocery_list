var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1/groceries', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var ItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, "Please Fille the Item"],
        unique: true
    },
    qty: {
        type: Number,
        required: [true, "Put quantity"]
    },
    priority: {
        type: Number,
        required: [true, "Fill up priority"],
        min: 1,
        max: 3
    }
}, { visionkey: "_something" })

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;