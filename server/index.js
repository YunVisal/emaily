const express = require("express");
const mongoose = require("mongoose");

const key = require("./config/keys");

mongoose.connect(key.mongoUri);
require("./models/User");

require("./services/passport");

const app = express();
require('./routes/authRoutes')(app);

app.listen(5000);