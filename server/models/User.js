const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    googleId: String
});

mongoose.model('users', User);