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
        callbackURL: config.googleRedirecturl,
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        await handleUserAuth(profile, done);
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: config.facebookClientId,
        clientSecret: config.facebookClientSecret,
        callbackURL: config.facebookRedirecturl
    },
    async (accessToken, refreshToken, profile, done) => {
        await handleUserAuth(profile, done);
    }
))

const handleUserAuth = async (profile, done) => {
    const existingUser = await User.findOne({ providerUserId: profile.id });

    if (existingUser) {
        return done(null, existingUser);
    }

    const user = await new User({ providerUserId: profile.id, provider: "facebook" }).save();
    done(null, user);
}

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