var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var Item = require('./public/models/item')
const path = require('path');
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('views', path.join(__dirname, 'views'));

app.all('/', function (req, res) {
    Item.find({}, (err, result)=>{
        res.render("sample.pug", {items:result})
    })
});


app.post('/item/create', function (req, res) {
    var grocery = new Item({
        item:req.body.item,
        qty: req.body.qty,
        priority: req.body.priority
    });
    grocery.save((err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            res.status(400).end(JSON.stringify(err))
        }
    

    })
       
       
})

app.get('/item/retrieve/all', (req, res)=>{
    Item.find({}, (err, result)=>{
        res.render("sample.pug", {items:result})
    })
})

app.all('/item/delete', function (req, res) {
    Item.findByIdAndRemove(req.body.id, (err, doc) => {
        if (!err) {
            
        }
        else { console.log('Error in Item delete :' + err); }
    });
})

app.all('/item/update', function (req, res) {
    console.log(req.body.qty)
    Item.findByIdAndUpdate(req.body.id, { $set: { item: req.body.item, qty: req.body.qty, priority: req.body.priority } }, { new: true }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        console.log(doc)
        res.end(JSON.stringify(doc))
    })

})

app.put('/item/retrieve/:id', (req, res)=>{
    console.log(req.params.id)
    Item.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.end(JSON.stringify(doc))
            console.log(JSON.stringify(doc))
        }
        else { console.log('Error in getting item :' + err); }
    });
})
app.use(express.static('public'))

http.listen(port, function () {
    console.log("running on port:" + port);

})