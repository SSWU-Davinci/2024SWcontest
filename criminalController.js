const criminalProvider = require('../Criminal/criminalProvider');  // criminalProvider를 참조
const criminalDao = require('../Criminal/criminalDao'); 

const addCriminalToCatalog = async (req, res) => {
    const { userId, criminalId } = req.body;

    if (!userId || !criminalId) {
        return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
    }

    try {
        // Provider를 통해 범인을 도감에 등록
        await criminalProvider.addCriminalToUserCatalog(userId, criminalId);

        res.status(200).json({ message: '도감에 범인이 추가되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = {
    addCriminalToCatalog,
};
