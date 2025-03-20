const express = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Query service route to fetch all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Event handler route (should be POST!)
app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        if (post) {
            post.comments.push({ id, content, status });
        }
    }
    if( type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
       
    console.log('Current Posts:', posts);
    res.send({});
});

app.listen(4002, () => {
    console.log('Query Service listening on 4002');
});
