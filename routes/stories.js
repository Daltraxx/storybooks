const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
})

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async(req, res) => {
    try {
        req.body.user = req.user.id;
        // console.log(req.body);
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

// @desc    Show all public stories
// @route   GET /stories
router.get('/', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean();
            
        res.render('stories/index', { stories });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async(req, res) => {
    const id = req.params.id;
    try {
        const story = await Story.findOne({ _id: id }).lean();

        if (!story) {
            return res.render('error/404');
        }

        // Non-strict equal necessary since story.user is ObjectId
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', { story });
        }
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async(req, res) => {
    const id = req.params.id;
    try {
        const story = await Story.findById(id).lean();

        if (!story) {
            return res.render('error/404');
        }

        // Non-strict equal necessary since story.user is ObjectId
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            const updateOptions = {
                new: true,
                runValidators: true
            };
            const updateStory = await Story.findOneAndUpdate({ _id: id }, req.body, updateOptions);
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

module.exports = router;