const express = require("express");
const router = express.Router();
const scriptController = require("../Script/scriptController");

router.get("/random-scripts", scriptController.getRandomScripts);

module.exports = router;