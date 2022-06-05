/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Anusmita Chanda Student ID: 154453203 Date: 4/6/2022
*
*  Online (Heroku) Link: https://pure-anchorage-41603.herokuapp.com/
*
********************************************************************************/ 


var express = require("express");
var app = express();
var route = require("path");
var blogservice = require("./blog-service");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " , HTTP_PORT);
}


app.get("/", function(req,res){
    res.redirect("/about");
});

app.get("/about", function(req,res){
    res.sendFile(route.join(__dirname,"./views/about.html"));
});

app.get("/blog", function(req, res){
    blog.getPublishedPosts().then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({message: err});
    });
});
app.get("/posts", function(req, res){
    blog.getAllPosts().then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({message: err});
    });
    
});
app.get("/categories", function(req, res){
    blog.getCategories().then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({message: err});
    });
});
app.get('*', function(req, res){
    res.status(404).sendFile(route.join(__dirname,"./views/status-404.html"));
  });

app.listen(HTTP_PORT, onHttpStart);

blogservice.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch(err => {
    console.log(err);
})