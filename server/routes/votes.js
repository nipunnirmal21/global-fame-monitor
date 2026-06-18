import express from 'express';
import Vote from '../models/Vote.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const emitVoteUpdate = (req, payload) => {
    const io = req.app.get('io');
    if (io) {
        io.emit('voteUpdate', payload);
    }
};

// @route   POST /api/votes
// @desc    Submit or update a vote (ATOMIC OPERATIONS)
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { celebrityId, type } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!celebrityId || !type) {
            return res.status(400).json({ message: 'celebrityId and type are required' });
        }

        if (!['like', 'dislike'].includes(type)) {
            return res.status(400).json({ message: 'type must be "like" or "dislike"' });
        }

        // Check if user already voted for this celebrity
        const existingVote = await Vote.findOne({ userId, celebrityId });

        if (existingVote) {
            if (existingVote.type === type) {
                // Same vote type - remove the vote (toggle off) ATOMICALLY
                await Vote.findOneAndDelete({ userId, celebrityId });
                emitVoteUpdate(req, {
                    celebrityId,
                    action: 'removed',
                    type
                });
                return res.json({
                    message: 'Vote removed',
                    action: 'removed',
                    previousType: type
                });
            } else {
                // Different vote type - update ATOMICALLY using findOneAndUpdate
                const updated = await Vote.findOneAndUpdate(
                    { userId, celebrityId },
                    { $set: { type } },
                    { new: true }
                );
                emitVoteUpdate(req, {
                    celebrityId,
                    action: 'updated',
                    type,
                    previousType: existingVote.type
                });
                return res.json({
                    message: 'Vote updated',
                    action: 'updated',
                    vote: updated
                });
            }
        }

        // Create new vote
        const vote = await Vote.create({
            userId,
            celebrityId,
            type
        });

        emitVoteUpdate(req, {
            celebrityId,
            action: 'created',
            type
        });

        res.status(201).json({
            message: 'Vote recorded',
            action: 'created',
            vote
        });
    } catch (error) {
        console.error('Vote error:', error);
        // Return proper error response without crashing server
        res.status(500).json({ message: 'Failed to process vote. Please try again.' });
    }
});

// @route   GET /api/votes/celebrity/:celebrityId
// @desc    Get all votes for a celebrity
// @access  Public
router.get('/celebrity/:celebrityId', async (req, res) => {
    try {
        const { celebrityId } = req.params;

        const likes = await Vote.countDocuments({ celebrityId: Number(celebrityId), type: 'like' });
        const dislikes = await Vote.countDocuments({ celebrityId: Number(celebrityId), type: 'dislike' });

        res.json({ likes, dislikes });
    } catch (error) {
        console.error('Get votes error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/votes/all
// @desc    Get vote counts for all celebrities
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const votes = await Vote.aggregate([
            {
                $group: {
                    _id: '$celebrityId',
                    likes: {
                        $sum: { $cond: [{ $eq: ['$type', 'like'] }, 1, 0] }
                    },
                    dislikes: {
                        $sum: { $cond: [{ $eq: ['$type', 'dislike'] }, 1, 0] }
                    }
                }
            }
        ]);

        // Convert to object with celebrityId as key
        const votesMap = {};
        votes.forEach(v => {
            votesMap[v._id] = { likes: v.likes, dislikes: v.dislikes };
        });

        res.json(votesMap);
    } catch (error) {
        console.error('Get all votes error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/votes/user/:celebrityId
// @desc    Get user's vote for a specific celebrity
// @access  Private
router.get('/user/:celebrityId', protect, async (req, res) => {
    try {
        const { celebrityId } = req.params;
        const userId = req.user._id;

        const vote = await Vote.findOne({ userId, celebrityId: Number(celebrityId) });

        res.json({
            hasVoted: !!vote,
            type: vote ? vote.type : null
        });
    } catch (error) {
        console.error('Get user vote error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/votes/user-all
// @desc    Get all votes by current user
// @access  Private
router.get('/user-all', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const votes = await Vote.find({ userId });

        // Convert to object with celebrityId as key
        const votesMap = {};
        votes.forEach(v => {
            votesMap[v.celebrityId] = v.type;
        });

        res.json(votesMap);
    } catch (error) {
        console.error('Get user votes error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/votes/user-history
// @desc    Get all votes by current user with timestamps for vote history display
// @access  Private
router.get('/user-history', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const votes = await Vote.find({ userId })
            .sort({ createdAt: -1 })
            .lean();

        // Return with formatted data
        const history = votes.map(vote => ({
            celebrityId: vote.celebrityId,
            type: vote.type,
            votedAt: vote.createdAt,
            _id: vote._id
        }));

        res.json(history);
    } catch (error) {
        console.error('Get user history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
