const res = require('express/lib/response');
var fs = require('fs');

var posts = [];
var categories = [];

var fs = require("fs");

module.exports.Initialize = function(){
    return new Promise(function(resolve, reject) {
        try{
            fs.readFile('./data/posts.json', function(err, data) {
                if(err)
                    throw err;
            
                posts = JSON.parse(data);
            });
            fs.readFile('./data/categories.json', function(err, data){
                if(err) throw err;
                categories = JSON.parse(data);
            })
        }catch(ex){
            reject("Unable to read file");
        }
        resolve("File successfully read.");
    })
}

module.exports.getAllPosts = function(){
    return new Promise(function(resolve, reject) {
        if(posts.length == 0){
            reject("No results returned.")
        }
        resolve(posts);
    })
}
module.exports.getPublishedPosts= function() {
    var publishedPosts = [];
    return new Promise(function(resolve, reject) {
        for(var i = 0; i < posts.length; i++){
            if(posts[i].published == true){
                publishedPosts.push(posts[i])                
            }
        }

        if(publishedPosts.length == 0){
            reject("No results returned.")
        }
        resolve(publishedPosts);
    })
}
module.exports.getCategories = function(){
    return new Promise(function(resolve, reject){        
        if(categories.length == 0){
            reject("No results returned.")
        }
        else{
            resolve(categories);
        }
    })
}