const provider = require('../Select/selectProvider');

const router = express.Router();

router.get('/random-scripts', async (req, res) => {
    try {
        const data = await provider.getRandomScriptsForCharacters();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
