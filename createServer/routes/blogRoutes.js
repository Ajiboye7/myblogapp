const express = require('express');
const router = express.Router();
const Blog = require('../views/models/blog');
const blogController = require('../controller/blogController');


// REDIRECT
router.get('/', blogController.blog_index);

// GET ROUTE
router.get('/create', blogController.blog_create_get);


//POST REQUEST
router.post('/', blogController.blog_create_post)
  
  // Getting id for route parameter
  router.get('/:id', blogController.blog_details);

  // DELETE REQUEST
  router.delete('/:id', blogController.blog_delete);


  module.exports = router;
 