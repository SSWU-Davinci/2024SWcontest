const express = require("express");
const router = express.Router();
const userController = require("../User/userController"); // userController를 가져옴

/* User listing. */
router.post("/login", userController.login);
router.post("/join", userController.join);
router.post("/checkName", userController.nameCheck);
router.post("/checkId", userController.idCheck);

router.get("/join", (req, res) => {
  res.render("join"); // join.ejs 파일을 렌더링
});

module.exports = router;
