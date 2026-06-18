import express from 'express';
import Celebrity from '../models/Celebrity.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

const CATEGORIES = ['sports', 'music', 'film', 'business', 'politics'];

const generateSlug = (name) => {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

const formatCelebrity = (doc) => ({
    id: doc.celebrityId,
    celebrityId: doc.celebrityId,
    name: doc.name,
    category: doc.category,
    bio: doc.bio,
    slug: generateSlug(doc.name),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
});

// @route   GET /api/celebrities
// @desc    Get all celebrities
// @access  Public
router.get('/', async (req, res) => {
    try {
        const celebrities = await Celebrity.find().sort({ celebrityId: 1 });
        res.json(celebrities.map(formatCelebrity));
    } catch (error) {
        console.error('Get celebrities error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/celebrities
// @desc    Create a celebrity
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, category, bio, celebrityId } = req.body;

        if (!name || !category || !bio) {
            return res.status(400).json({ message: 'name, category, and bio are required' });
        }

        if (!CATEGORIES.includes(category)) {
            return res.status(400).json({ message: `category must be one of: ${CATEGORIES.join(', ')}` });
        }

        let nextId = celebrityId;
        if (nextId !== undefined) {
            const existing = await Celebrity.findOne({ celebrityId: Number(nextId) });
            if (existing) {
                return res.status(400).json({ message: 'A celebrity with this ID already exists' });
            }
        } else {
            const latest = await Celebrity.findOne().sort({ celebrityId: -1 });
            nextId = (latest?.celebrityId || 0) + 1;
        }

        const celebrity = await Celebrity.create({
            celebrityId: Number(nextId),
            name: name.trim(),
            category,
            bio: bio.trim()
        });

        res.status(201).json(formatCelebrity(celebrity));
    } catch (error) {
        console.error('Create celebrity error:', error);
        res.status(500).json({ message: 'Failed to create celebrity' });
    }
});

// @route   PUT /api/celebrities/id/:celebrityId
// @desc    Update a celebrity
// @access  Admin
router.put('/id/:celebrityId', protect, admin, async (req, res) => {
    try {
        const { celebrityId } = req.params;
        const { name, category, bio } = req.body;

        const celebrity = await Celebrity.findOne({ celebrityId: Number(celebrityId) });
        if (!celebrity) {
            return res.status(404).json({ message: 'Celebrity not found' });
        }

        if (category && !CATEGORIES.includes(category)) {
            return res.status(400).json({ message: `category must be one of: ${CATEGORIES.join(', ')}` });
        }

        if (name !== undefined) celebrity.name = name.trim();
        if (category !== undefined) celebrity.category = category;
        if (bio !== undefined) celebrity.bio = bio.trim();

        await celebrity.save();
        res.json(formatCelebrity(celebrity));
    } catch (error) {
        console.error('Update celebrity error:', error);
        res.status(500).json({ message: 'Failed to update celebrity' });
    }
});

// @route   DELETE /api/celebrities/id/:celebrityId
// @desc    Delete a celebrity
// @access  Admin
router.delete('/id/:celebrityId', protect, admin, async (req, res) => {
    try {
        const { celebrityId } = req.params;

        const celebrity = await Celebrity.findOneAndDelete({ celebrityId: Number(celebrityId) });
        if (!celebrity) {
            return res.status(404).json({ message: 'Celebrity not found' });
        }

        res.json({ message: 'Celebrity deleted', celebrity: formatCelebrity(celebrity) });
    } catch (error) {
        console.error('Delete celebrity error:', error);
        res.status(500).json({ message: 'Failed to delete celebrity' });
    }
});

// @route   GET /api/celebrities/:slug
// @desc    Get celebrity details with extended bio from Wikipedia
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        if (slug === 'id') {
            return res.status(404).json({ message: 'Celebrity not found' });
        }

        const searchName = slug.replace(/-/g, ' ');
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug.replace(/-/g, '_'))}`;

        const dbCelebrity = await Celebrity.findOne({
            name: { $regex: new RegExp(`^${searchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
        });

        try {
            const response = await fetch(wikiUrl);
            if (response.ok) {
                const data = await response.json();
                return res.json({
                    slug,
                    id: dbCelebrity?.celebrityId || null,
                    name: data.title || dbCelebrity?.name,
                    description: data.description || '',
                    extract: data.extract || dbCelebrity?.bio || '',
                    thumbnail: data.thumbnail?.source || null,
                    originalImage: data.originalimage?.source || null,
                    wikiUrl: data.content_urls?.desktop?.page || null,
                    category: dbCelebrity?.category || null,
                    bio: dbCelebrity?.bio || null
                });
            }
        } catch (wikiError) {
            console.log('Wikipedia API error:', wikiError.message);
        }

        if (dbCelebrity) {
            return res.json({
                slug,
                id: dbCelebrity.celebrityId,
                name: dbCelebrity.name,
                description: '',
                extract: dbCelebrity.bio,
                thumbnail: null,
                originalImage: null,
                wikiUrl: null,
                category: dbCelebrity.category,
                bio: dbCelebrity.bio
            });
        }

        res.json({
            slug,
            name: searchName.replace(/\b\w/g, (l) => l.toUpperCase()),
            description: '',
            extract: 'Biography information not available.',
            thumbnail: null,
            originalImage: null,
            wikiUrl: null
        });
    } catch (error) {
        console.error('Celebrity detail error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
