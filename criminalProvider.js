const criminalDao = require('../Criminal/criminalDao');

const checkCriminalInCatalog = async (userId, criminalId) => {
    try {
        const result = await criminalDao.checkCriminalInCatalog(userId, criminalId);
        return result;
    } catch (error) {
        console.error(`Error in checkCriminalInCatalog: ${error.message}`);
        throw error;
    }
};

const getCriminalDetails = async (criminalId) => {
    try {
        const criminalDetails = await criminalDao.getCriminalDetails(criminalId);
        return criminalDetails;
    } catch (error) {
        console.error(`Error in getCriminalDetails: ${error.message}`);
        throw error;
    }
};

const addCriminalToUserCatalog = async (userId, criminalId) => {
    const criminalDetails = await getCriminalDetails(criminalId);
    if (!criminalDetails) {
        throw new Error('해당 범인을 찾을 수 없습니다.');
    }

    const criminal = {
        criminalId: criminalId,
        name: criminalDetails.name,
        details: criminalDetails.details
    };

    return await criminalDao.addCriminalToUserCatalog(userId, criminal);
};


module.exports = {
    checkCriminalInCatalog,
    getCriminalDetails,
    addCriminalToUserCatalog,  
};