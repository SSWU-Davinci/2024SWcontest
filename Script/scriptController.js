const scriptProvider = require('../Script/scriptProvider');

exports.getRandomScripts = async (req, res) => {
    try {
        const finalScripts = await scriptProvider.getRandomScripts();
        if (finalScripts && finalScripts.length > 0) {
            res.status(200).json({ success: true, data: finalScripts });
        } else {
            res.status(404).json({ success: false, message: 'No scripts found' });
        }
    } catch (error) {
        console.error('Error in /random-scripts:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve scripts', error: error.message });
    }
};