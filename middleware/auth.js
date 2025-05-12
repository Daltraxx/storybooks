const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // if not logged in, redirect to home page
        res.redirect('/');
    }
}

const ensureGuest = (req, res, next) => {
    // dont show home/login page if already logged in
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        return next();
    }
}


module.exports = { ensureAuth, ensureGuest };