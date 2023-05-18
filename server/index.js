const express = require("express");
const mongoose = require("mongoose");
const CookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");

mongoose.connect(keys.mongoUri);
require("./models/User");

require("./services/passport");

const app = express();
app.use(bodyParser.json());
app.use(
    CookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require("./routes/paymentRoutes")(app);

app.listen(5000);