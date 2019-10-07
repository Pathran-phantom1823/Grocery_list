var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var Item = require('./public/models/item')
const path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var dburl = "mongodb://localhost:27017/onlinestore";
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('views', path.join(__dirname, 'views'));

app.all('/', function (req, res) {
    Item.find({}, (err, result) => {
        res.render("sample.pug", { items: result })
    })
});


app.post('/item/create', function (req, res) {
    var grocery = new Item({
        item: req.body.item,
        qty: req.body.qty,
        priority: req.body.priority
    });
    if (Item.find({ item: { $exists: false } })) {
        grocery.save()
            .then(success => {
                res.send('save ' + req.body.id);
            })
            .catch(err => {
                res.status(400).send("unable to save")
            })
    }

})

app.get('/item/retrieve/all', (req, res) => {
    Item.find({}, (err, result) => {
        res.render("sample.pug", { items: result })
    })
})

app.all('/item/delete', function (req, res) {
    Item.findByIdAndRemove(req.body.id, (err, doc) => {
        if (!err) {

        }
        else { console.log('Error in employee delete :' + err); }
    });
})

app.put('/item/update', (req, res) => {

})

app.all('/item/retrieve/id', (req, res) => {
    Item.find(req.body.item, (err, rows, result) => {
        if (err) throw err;
        var data = [];
        for (i = 0; i < rows.length; i++) {
            data.push(rows[i].item);
        }
        res.end(JSON.stringify(data));
    })
})


app.use(express.static('public'))

http.listen(port, function () {
    console.log("running on port:" + port);

})