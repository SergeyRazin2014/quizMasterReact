const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');

module.exports = {

    // регистрация
    async addUser(req, res) {
        try {
            const errors = validationResult(req);  //получаем ошибки валидации
            //если есть ошибки валидации, то шлем их пользователю
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                });
            }

            const { login, password } = req.body;
            const findedUser = await User.findOne({ login });
            if (findedUser) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({ login, password: hashedPassword });
            await user.save();


            const token = jwt.sign(
                { userId: user._id }, config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.status(201).json({ token, userId: user._id, message: 'Пользователь создан' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    },

    // логин
    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const { login, password } = req.body;

            const user = await User.findOne({ login });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const token = jwt.sign(
                { userId: user._id }, config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user._id });
        } catch (err) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    },

    // получение юзера через id в токене
    async getAuthUser(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password');
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
}