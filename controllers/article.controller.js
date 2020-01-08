const ArticleModel = require('../models/article');

module.exports = {
    addArticle: async (req, res) => {
        try {
            const newArticle = new ArticleModel(req.body);
            await newArticle.save();
            res.send('article add success');
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },
    updateArticle: async (req, res) => {
        try {
            const newArticle = new ArticleModel(req.body);
            let err = newArticle.validateSync();
            if (err) {
                console.log(err);
            }


            let result = await ArticleModel.findOneAndUpdate({ _id: newArticle._id }, newArticle);

            if (result) {
                res.json(result);
            } else {
                res.sendStatus(500).send(err);
            }

        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },
    deleteArticle: async (req, res) => {
        try {
            const articleId = req.params["id"];
            const article = await ArticleModel.findOneAndDelete({ _id: articleId })
            res.json(article);
        } catch (err) {
            console.log(err);
            res.json(err);
        }

    },
    getAllArticles: async (req, res) => {
        try {
            let allArticles = await ArticleModel.find({});
            res.json(allArticles);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },
    getArticleById: async (req, res) => {
        try {
            let articleId = req.params['id'];
            const find = await ArticleModel.findOne({ _id: articleId });
            res.json(find);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }

}