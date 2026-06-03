import express from 'express';

const router = express.Router();

// Celebrity data (imported from frontend for Wikipedia bio fetching)
const famousPeople = [
    { id: 1, name: "Cristiano Ronaldo", category: "sports", bio: "Portuguese football legend. Five-time Ballon d'Or winner and all-time top scorer." },
    { id: 2, name: "Lionel Messi", category: "sports", bio: "Argentine football icon. Eight-time Ballon d'Or winner and World Cup champion." },
    { id: 3, name: "Virat Kohli", category: "sports", bio: "Indian cricket superstar. One of the greatest batsmen in cricket history." },
    // Note: Full data is managed on frontend. This endpoint fetches extended bio from Wikipedia
];

// Generate URL slug from name
const generateSlug = (name) => {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// @route   GET /api/celebrities/:slug
// @desc    Get celebrity details with extended bio from Wikipedia
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        // Decode the slug back to a search-friendly name
        const searchName = slug.replace(/-/g, ' ');

        // Fetch summary from Wikipedia API
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug.replace(/-/g, '_'))}`;

        try {
            const response = await fetch(wikiUrl);
            if (response.ok) {
                const data = await response.json();
                return res.json({
                    slug,
                    name: data.title,
                    description: data.description || '',
                    extract: data.extract || '',
                    thumbnail: data.thumbnail?.source || null,
                    originalImage: data.originalimage?.source || null,
                    wikiUrl: data.content_urls?.desktop?.page || null
                });
            }
        } catch (wikiError) {
            console.log('Wikipedia API error:', wikiError.message);
        }

        // Fallback if Wikipedia API fails
        res.json({
            slug,
            name: searchName.replace(/\b\w/g, l => l.toUpperCase()),
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
