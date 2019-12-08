const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/ig_clone';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB has connected successfully.'))
    .catch((err) => console.log(`MongoDB connection error: ${ err }`));

module.exports = {
    User: require('./user'),
    Post: require('./post'),
    Comment: require('./comment')
};