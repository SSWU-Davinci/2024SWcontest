var express = require('express');
var router = express.Router();
const scriptController = require('../Script/scriptController');

router.get('/random-scripts', scriptController.getRandomScripts);

module.exports = router;