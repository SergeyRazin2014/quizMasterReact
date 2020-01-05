const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // quizIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    children: [{ type: String, }]
});

const eventModel = mongoose.model('Category', CategorySchema);
module.exports = eventModel;