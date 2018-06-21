'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();

// return all current Blog posts
router.get('/', (req, res) => {
  BlogPost.find().then(posts => {
    res.json(posts.map(post => post.serialize()));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something went wrong'});
  });
});


router.get('/:id', (req, res) => {
  BlogPost
  .findById(req.params.id)
  .then(post => res.json(post.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'something went wrong' });
  });
});


router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title','content','author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
  .create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    publishDate: req.body.publishDate
  })
  .then(blogPost => res.status(201).json(blogPost.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong'});
  });
});

router.put('/:id', jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['title', 'content', 'author'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  BlogPost
  .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
  .then(updatedPost => res.status(204).end())
  .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


router.delete('/:id', (req, res) => {
  BlogPost
    .findByIdAndDelete(req.params.id)
    .then(deletedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  });


module.exports = {router};
