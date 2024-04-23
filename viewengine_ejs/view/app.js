const express = require('express');
const { dirname } = require('path');


const app = express();
//listen for request 
app.listen(3001);

app.get('/' ,(req,res)=>{
    res.sendFile('./views/index.html', {root: __dirname})
})

app.get('/about' ,(req,res)=>{
    res.sendFile('./views/about.html', {root: __dirname})
})

// REDIRECTS
app.get('/about-us',(req,res)=>{node
    res.redirect('/about')
})

//404 page 
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root: __dirname})
}); 
