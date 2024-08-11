const criminalProvider = require('../Criminal/criminalProvider');

exports.addCriminalToUserCatalog = async (req, res) => {
    const { user_number, script_number } = req.body;

    if (!user_number || !script_number) {
        return res.status(400).json({ error: 'userNumber and scriptNumber are required' });
    }

    try {
        const result = await criminalProvider.addCriminalToUserCatalog(user_number, script_number);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error(`Error adding criminal to user catalog: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while adding criminal to user catalog' });
    }
};

exports.getUserCatalog = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const result = await criminalProvider.getUserCatalog(userId);
        if (result.success) {
            res.status(200).json({ scriptNumbers: result.scriptNumbers });
        } else {
            res.status(404).json({ message: 'User catalog not found' });
        }
    } catch (error) {
        console.error(`Error retrieving user catalog: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while retrieving user catalog' });
    }
};
