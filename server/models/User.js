const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    providerUserId: String,
    provider: String,
    credit: { type: Number, default: 0 },
});

mongoose.model('users', User);