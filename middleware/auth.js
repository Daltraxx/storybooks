const ensureAuth = (req, res, next) => {
    // if logged in, allow requested route, otherwise redirect to home page
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

const ensureGuest = (req, res, next) => {
    // if logged in, redirect to dashboard, otherwise allow requested route
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        return next();
    }
}


module.exports = { ensureAuth, ensureGuest };