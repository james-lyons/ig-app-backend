const db = require('../models');
const posts = require('./posts.json');

db.Post.deleteMany({}, () => {
    posts.forEach(post => {
        db.Post.create(post, (err, createdPost) => {
            if (err) return console.log(err)
        });
    });
});