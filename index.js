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
    if(Item.find({item:{$exists:false}})){
    grocery.save()
        .then(success => {
            res.send('save '+ req.body.id);
        })
        .catch(err => {
            res.status(400).send("unable to save")
        })
    }
       
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
        else { console.log('Error in employee delete :' + err); }
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

// app.get('/item/retrieve/item',(req, res)=>{
//     res.send(req.body.item);
// })

app.get('/item/retrieve/item',(req, res)=>{
    Item.find({
        "$text":{
            "$search": req.body.item
        }
    })
    .then(item => console.log(item))
    
})
// app.put('/item/edit', function(req, res){
//     var items = {}
// })

// app.get('/all', function(req,res){
//     // var data = Item.db.collection('items').find();
//     //     data.each((err, item)=>{
//     //         if(item!= null){
//     //           return "<p>"+item.item + "</p>"
//     //         }
//     //     })
// })
app.use(express.static('public'))

http.listen(port, function () {
    console.log("running on port:" + port);

})