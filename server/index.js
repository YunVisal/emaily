const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./config/keys");
const app = express();

passport.use(new GoogleStrategy(
    {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken) => {
        console.log(accessToken);
    }
));

app.listen(5000);