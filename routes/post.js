const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkhauth = require('../middleware/check-auth');

router.get('', (req, res) => 
{
    
    Post.find().then((posts) =>
    {
        res.json
        ({
            message: 'Posts found',
            posts:posts
        })
    })
});



router.post('',checkhauth, (req, res) =>
{
    const post = new Post
    ({
        title: req.body.title,
        description: req.body.description,
        departmentCode: req.body.departmentCode
    })
    post.save().then(() =>
    {
        res.status(201).json
        ({
            message: 'Post created',
            post:post
        })
    })
});

router.delete('/:id',checkhauth, (req, res) =>
{
    Post.deleteOne({_id: req.params.id})
    .then((result) =>
    {
        res.status(200).json({message: "Post Deleted"});
    });
})

router.get('/:id', (req, res) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({
        message: 'Post found',
        post: post,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;