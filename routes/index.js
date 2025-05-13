const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
})


// @desc    Login/Landing page
// @route   GET /
router.get('/dashboard', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        const renderData = { 
            name: req.user.firstName,
            stories
        };
        res.render('dashboard', renderData);
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

module.exports = router;