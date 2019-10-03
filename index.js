var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var Item = require('./public/models/item')
const path = require('path');
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));

app.all('/', function (req, res) {
    Item.find({}, (err, result)=>{
        res.render("sample.pug", {items:result})
    })
    // res.sendFile(path.join(__dirname, +'views/index.html'));
});



app.post('/create', function (req, res) {
    var grocery = new Item({
        item:req.body.item,
        qty: req.body.qty,
        priority: req.body.priority
    });
    console.log(grocery)
    if(Item.find({item:req.body.item,$exists:true})){
        console.log('Item already exists Enter another Item')
    }else{
    grocery.save()
        .then(success => {
            res.send("saved")
        })
        .catch(err => {
            res.status(400).send("unable to save")
        })
    }
})

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