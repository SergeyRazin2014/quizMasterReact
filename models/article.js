const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const eventModel = mongoose.model('Article', ArticleSchema);
module.exports = eventModel;