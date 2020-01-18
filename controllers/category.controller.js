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
    },

    updateCategory: async (req, res) => {
        try {
            let category = req.body;
            let modelForValid = new CategoryModel(category);
            let err = modelForValid.validateSync();
            if (err) {
                console.log(err);
            }

            let result = await CategoryModel.findOneAndUpdate({ _id: category._id }, category);

            if (result) {
                res.json(result);
            } else {
                res.sendStatus(500).send(err);
            }
        } catch (err) {
            console.log(err);
            res.send('error: ', err.message);
        }
    },
    getCategoryById: async (req, res) => {
        try {
			let categoryId = req.params['id'];
			const find = await CategoryModel.findOne({ _id: categoryId });
			res.json(find);
		} catch (err) {
			console.log(err);
			res.send('error:', err.message);
		}
    }
}