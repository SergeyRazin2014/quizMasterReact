const express = require('express');
const app = express();
const connectDB = require('./config/db');

// подклюение к монго
connectDB();

app.use(express.json({ extended: false }));

app.use(require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});