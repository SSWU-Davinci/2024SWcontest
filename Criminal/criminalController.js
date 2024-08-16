const criminalProvider = require('../Criminal/criminalProvider');
// 사용자 번호와 위치 정보를 사용하여 user_animal 테이블에 새로운 동물 추가하는 엔드포인트
exports.addAnimal = async (req, res) => {
    const { user_number, floor, position } = req.body;
    // 필수 입력값이 누락된 경우 에러 응답
    if (!user_number || !floor || !position) {
        return res.status(400).json({ error: 'user_number, floor, position are required' });
    }

    try {
        // criminalProvider를 통해 동물 추가 로직 실행
        const result = await criminalProvider.addAnimal(user_number, floor, position);
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
exports.getAnimal = async (req, res) => {
    const { user_number } = req.body;
    // 필수 입력값이 누락된 경우 에러 응답
    if (!user_number) {
        return res.status(400).json({ error: 'user_number is required' });
    }

    try {
        // criminalProvider를 통해 user_animal 테이블에서 데이터를 가져옴
        const result = await criminalProvider.getAnimal(user_number);
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