var passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy;


module.exports = function(app){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user,done){
        done(null, user);
    })

    passport.deserializeUser(function(user,done){
        done(null, user);
    })


    passport.use(new FacebookStrategy({
        clientID: "2145323409050746",
        clientSecret: "16cacf12a3248cfb44823e8196a99a2f",
        callbackURL:"https://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "email", "displayName", "photos"],
        passReqToCallback: true 
    },
    function (req, accessToken, refreshToken, profile, done){
        var user = {};

        user.image = profile._json.picture.data.url;
        user.displayName = profile.displayName;
        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;

        done(null, user);
    }



))
}