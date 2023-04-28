const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");

const config = require("../config/keys");

const User = mongoose.model("users");

passport.use(new GoogleStrategy(
    {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ providerUserId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    console.log("Already sign in");
                    done(null, existingUser);
                }
                else {
                    new User({ providerUserId: profile.id, provider: "google" }).save()
                        .then(user => done(null, user));
                }
            });
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: config.facebookClientId,
        clientSecret: config.facebookClientSecret,
        callbackURL: `${config.hostName}/auth/facebook/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ providerUserId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    console.log("Already sign in");
                    done(null, existingUser);
                }
                else {
                    new User({ providerUserId: profile.id, provider: "facebook" }).save()
                        .then(user => done(null, user));
                }
            });
    }
))

/*
    After complete the authentication, passport will give back a cookie that
    contain user id to identify the user. Below method will be called immediately to do so.
*/
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/*
    When any request come in, the flow will be:
        1. cookie-session will extract the cookie
        2. Passport will get user id from cookie
        3. Below method will use this id to get User data from mongo
        4. User data will be attach to user property of req (req.user)
*/
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        });
});