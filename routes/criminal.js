var express = require('express');
var router = express.Router();
const criminalController = require('../Criminal/criminalController');

// 도감에 범인 추가
router.post('/add', criminalController.addAnimalToUserCatalog);

// 도감 목록 조회
router.get('/catalog/:user_number', criminalController.getUserCatalog);

module.exports = router;
