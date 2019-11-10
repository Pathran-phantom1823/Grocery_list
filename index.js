var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var Employee = require('./public/models/item')
const path = require('path');
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('views', path.join(__dirname, 'views'));

app.all('/', function (req, res) {
    Employee.find({}, (err, result)=>{
        res.render("sample.pug", {employees:result})
    })
});


app.all('/employee/create', function (req, res) {
    var grocery = new Employee({
        employee:req.body.employee,
        address: req.body.address,
        email: req.body.email,
        description: req.body.description
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

app.get('/employee/retrieve/all', (req, res)=>{
    Employee.find({}, (err, result)=>{
        res.render("sample.pug", {employees:result})
    })
})

app.all('/employee/delete', function (req, res) {
    Employee.findByIdAndRemove(req.body.id, (err, doc) => {
        if (!err) {
            
        }
        else { console.log('Error in employee delete :' + err); }
    });
})

app.all('/employee/update', function (req, res) {
    console.log(req.body.qty)
    Employee.findByIdAndUpdate(req.body.id, { $set: { employee: req.body.employee, address: req.body.address, email: req.body.email, description:req.body.description } }, { new: true }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        console.log(doc)
        res.end(JSON.stringify(doc))
    })

})

app.put('/employee/retrieve/:id', (req, res)=>{
    console.log(req.params.id)
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.end(JSON.stringify(doc))
            console.log(JSON.stringify(doc))
        }
        else { console.log('Error in getting employee :' + err); }
    });
})

app.get('/employee/search', function(req, res) {
    Employee.find({ employee: { $regex : ".*"+ req.query.search +".*", $options:'i' } }, function(err, result){
        return res.status(200).json({result})
   
     });
 });
app.use(express.static('public'))

http.listen(port, function () {
    console.log("running on port:" + port);

})