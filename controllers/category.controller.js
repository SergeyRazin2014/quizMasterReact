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

    updateAllCategories: async (req, res) => {
        try {
            const allCategory = req.body;

            // const resultArr = [];
            for (let i = 0; i < allCategory.length; i++) {
                const category = allCategory[i];
                await CategoryModel.findOneAndUpdate({ _id: category._id }, category);
                // resultArr.push(result);
            }

            res.json({ message: "Катеории сохранены успешно" });

        } catch (err) {
            console.log(err);
            res.send('error', err.message);
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
    },
    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params["id"];
            const category = await CategoryModel.findOneAndDelete({ _id: categoryId })
            res.json(category);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }

}