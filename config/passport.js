const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

const configurePassport = (passport) => {
    const googleStrategyData = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    };

    passport.use(new GoogleStrategy(googleStrategyData, async(accessToken, refreshToken, profile, done) => {
            console.log(profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}

module.exports = configurePassport;

// Saved in case above refactor breaks something
// module.exports = function(passport) {
//     passport.use(
//         new GoogleStrategy({
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: '/auth/google/callback'
//         },
//         async(accessToken, refreshToken, profile, done) => {
//             console.log(profile);
//         })
//     );

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//       });
      
//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => done(err, user));
//     });
// }