const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //получили переменную из конфига

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        // eslint-disable-next-line no-undef
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDB;