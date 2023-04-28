const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    providerUserId: String,
    provider: String
});

mongoose.model('users', User);