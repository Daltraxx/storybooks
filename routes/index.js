const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
})


// @desc    Login/Landing page
// @route   GET /
router.get('/dashboard', ensureAuth, (req, res) => {
    const sessionData = {
        name: req.user.firstName
    };
    
    res.render('dashboard', sessionData);
})

module.exports = router;