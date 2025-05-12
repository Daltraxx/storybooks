const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const configurePassport = (passport) => {
    const googleStrategyData = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    };

    const googleStrategyVerifyCallback = async(accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                console.log('User found');
                done(null, user);
            } else {
                console.log('Creating User');
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    passport.use(new GoogleStrategy(googleStrategyData, googleStrategyVerifyCallback));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null)
        }
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