const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./Product.js')
const handlebars = require('express3-handlebars').create({});
const nunjucks=require('nunjucks');


var categories = []
var items = []
var itemsd= {}
itemsd['categories']=[]
itemsd['items']={}
const path = require('path')
var app = express()
app.use(express.urlencoded({ extended: true })) //bodyparser
app.set('views', path.join(__dirname, 'views')); //template directory

var env = nunjucks.configure(['views/'], { // set folders with templates
        autoescape: true, 
        express: app
    });



app.get("/", (req, res, next) => {

        res.sendStatus(404)
})

app.get('/admin', (req, res, next) => {
        
        var data = {
                firstName: 'Andy',
                lastName: 'Neale'
            } ;
        console.log("get");
        console.log(itemsd);
        res.render('home.html', {itemsd: itemsd, data: data})
})

app.post('/admin', (req, res, next) => {
        
        if (req.body.categoryname != null && req.body.categoryname !='') {
                
                
                itemsd['categories'].push(req.body.categoryname);
                itemsd['items'][req.body.categoryname] = []
                console.log(itemsd);
        }
        if (req.body.itemname != null) {
                var prod=new Product({name: req.body.itemname, price: req.body.price, size: req.body.size, description: req.body.description, category: req.body.category})
                //console.log(prod)
                
                itemsd['items'][prod.category].push(prod);
                items.push(req.body.itemname);
                console.log(itemsd);
                //console.log(itemsd['items'][prod.category]);
        }
        var data = {
                firstName: 'Andy',
                lastName: 'Neale'
            } ;
        res.render('home.html', {itemsd: itemsd, data: data})
})
app.post('/op', (req, res, next) => {
        var data = req.body.itemname
        items.push(data)
        res.render('home', { itemName: data, item: items })
})

app.get('/admin/api', (req, res, next)=>{
        res.send(JSON.stringify(itemsd, null, 2))
})

app.listen(5000, () => {
        console.log("Server connected at http://127.0.0.1:5000/admin");
})

