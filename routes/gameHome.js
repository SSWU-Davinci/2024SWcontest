var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // home.ejs 파일을 렌더링
});

router.get('/inventory', (req, res) => {
    res.render('inventory'); // home.ejs 파일을 렌더링
});

module.exports = router;