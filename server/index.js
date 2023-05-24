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

if (process.env.NODE_ENV === "production") {
    // serve react app
    app.use(express.static("client/build"));

    // if no match path, return index.html
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.port || 5000;
app.listen(PORT);