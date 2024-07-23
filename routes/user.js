var express = require('express');
var router = express.Router();
const userController = require('../User/userController'); // userController를 가져옴

/* User listing. */
router.post('/login', userController.login);
router.post('/join', userController.join);
router.post('/checkName', userController.nameCheck);
router.post('/checkId', userController.idCheck);

module.exports = router;
