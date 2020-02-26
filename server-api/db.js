const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/santa';

mongoose.connect(dbURI)
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
