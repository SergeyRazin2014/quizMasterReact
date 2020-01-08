const CategoryModel = require('../models/category');

module.exports = {

    getAllCategories: async (req, res) => {
        try {
            let allCategory = await CategoryModel.find({});
            res.json(allCategory);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    addCategory: async (req, res) => {
        try {
            const quiz = new CategoryModel(req.body);
            await quiz.save();
            res.send('category add success');
        } catch (err) {
            console.log(err);
            res.send('error: ', err.message);
        }
    }
}