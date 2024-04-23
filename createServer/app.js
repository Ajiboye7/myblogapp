const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')

//Express App
const app = express();

//connect to mongodb
//const dbURI = 'mongodb+srv://ajiboyemuyideen7:jibs123@ajiboyemuyideen7.x4fwvkb.mongodb.net/AjiboyeDB'

//mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
//.then(()=> app.listen(3000))
//.catch((err)=> console.log(err));

// Connect to MongoDB
const dbURI = "mongodb+srv:ajiboyemuyideen7:Olanrewaju18#@myblog.6o5kgkx.mongodb.net/AjiboyeDB"

 /*'mongodb+srv://ajiboyemuyideen7:jibs123@ajiboyemuyideen7.x4fwvkb.mongodb.net/AjiboyeDB'*/

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
    console.log("Connected to MongoDB, server running on port 3000");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));



//Register View engine
app.set('view engine','ejs');

// MIDDLEWARE FOR THE POST REQUEST
app.use(express.urlencoded({extended:true}));

//DON'T THINK IS USEFUL
app.use(morgan('dev'));

// Middeleware & static files
app.use(express.static('public'));

//ROUTES MIDDLEWARE
app.use('/blogs',blogRoutes);

//OTHER ROUTES
app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my blog',
        body:' more about my blog'
    });
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/all-blogs', (req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/single-blog', (req,res)=>{
    Blog.findById("657d8b1c5edb8b697698eedd")
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

//HOME ROUTE
app.get('/' ,(req,res)=>{
  res.redirect('/blogs');
 
})
//ABOUT ROUTE
app.get('/about' ,(req,res)=>{
   res.render('about',{title: 'About'});
})
 
//404 page 
app.use((req,res)=>{
    res.status(404).render('404', {title: 'Error 404!'});
}); 