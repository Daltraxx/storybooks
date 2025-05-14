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
        await Story.create(req.body);
        console.log(`Created story with id ${req.body.user}`);
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

// @desc    Show single story
// @route   GET /stories/id
router.get('/:id', ensureAuth, async(req, res) => {
    const id = req.params.id;
    try {
        const story = await Story.findById(id).populate('user').lean();

        if (!story) {
            console.log(`No story found with id ${id}`);
            return res.render('error/404');
        }
        // Add logic for handling private stories (should only be viewable by story owner)
        res.render('stories/view', { story });
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
            console.log('User not story owner');
            res.redirect('/stories');
        } else {
            const updateOptions = {
                new: true,
                runValidators: true
            };
            const updateStory = await Story.findOneAndUpdate({ _id: id }, req.body, updateOptions);
            console.log(`Updated story with id ${id}`);
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async(req, res) => {
    const id = req.params.id;
    try {
        const story = await Story.findById(id).lean();

        if (!story) {
            return res.render('error/404');
        }
        
        if (story.user != req.user.id) {
            console.log('User not story owner');
            res.redirect('/dashboard');
        } else {
            const deleteStory = await Story.deleteOne({ _id: id });
            console.log(`Deleted story with id ${id}`);
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})

module.exports = router;