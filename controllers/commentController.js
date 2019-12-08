// SECTION Modules

const db = require('../models');

// SECTION Controllers

// Get One Comments
const findComment = (req, res) => {
    db.Comment.find({}, (err, foundComment) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Comment successfully found.',
            data: foundComment
        });
    });
};

// Index Comments
const indexComments = (req, res) => {
    db.Comment.find({}, (err, foundComments) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Comment successfully found.',
            data: foundComments
        });
    });
};

// Create a Comment
const createComment = (req, res) => {
    const comment = {
        author: req.session.currentUser._id,
        post: req.body.post,
        comment_text: req.body.comment_text,
    };

    db.Comment.create(comment, (err, createdComment) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });


    })
}

// Edit a Comment
const editComment = (req, res) => {
    db.Comment.findByIdAndUpdate(req.params.id, (err, editedComment) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(202).json({
            status: 200,
            message: 'Comment successfully edited'
        });
    });
};

// Delete a Comment
const deleteComment = (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Comment successfully deleted.'
        });
    });
};

module.exports = {
    indexComments,
    findComment,
    createComment,
    editComment,
    deleteComment
}