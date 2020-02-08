var express = require("express");
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get("/", indexController.home);

/* GET login page. */
router.get("/login", indexController.login);

/* Post login page. */
router.post("/login", indexController.loginPost);

/* GET Register page. */
router.get("/register", indexController.register);

/* Post Register page. */
router.post("/register", indexController.registerPost);

/* GET Post page. */
router.get("/post/:id", indexController.post);

/* Logout */
router.get("/logout", indexController.logout);

module.exports = router;
