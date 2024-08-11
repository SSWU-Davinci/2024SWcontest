const criminalProvider = require('../Criminal/criminalProvider');

exports.addCriminalToUserCatalog = async (req, res) => {
    const { user_number, script_number, animal_number } = req.body;

    if (!user_number || !script_number || !animal_number) {
        return res.status(400).json({ error: 'user_number, script_number, and animal_number are required' });
    }

    try {
        const result = await criminalProvider.addAnimalToUserCatalog(user_number, script_number, animal_number);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error(`Error adding criminal to user catalog: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while adding animal to user catalog' });
    }
};

// 사용자 번호를 입력받아 user_animal 테이블에서 해당 사용자 번호에 대한 모든 행을 반환하는 엔드포인트
exports.getUserCatalog = async (req, res) => {
    const { user_number } = req.body;

    if (!user_number) {
        return res.status(400).json({ error: 'user_number is required' });
    }

    try {
        const result = await criminalProvider.getUserCatalog(user_number);
        if (result.success) {
            res.status(200).json({ userAnimals: result.userAnimals });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error(`Error in getUserCatalog controller: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while retrieving user catalog' });
    }
};