const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const { execute } = require('./jsonImport');

// подклюение к монго.
connectDB();

app.use(express.json({ limit: '10mb', extended: false }));

app.use(require('./routes'));

// Подключаем статические файлы для продакшена
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// execute().then(() => {
// 	console.log('IMPORT DONE----------------');
// })
