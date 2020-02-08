// include express
var express = require("express");
// instant of Router
var router = express.Router();
//include Tags Controller
const tagsController = require("../controllers/tagsController");

/* Get tags listing. */
router.get("/", tagsController.get);

/* Get create tag. */
router.get("/create", tagsController.create);

/* Save tag. */
router.post("/create", tagsController.save);

/* Delete tag. */
router.get("/delete/:id", tagsController.delete);

/* Show tag. */
router.get("/show/:id", tagsController.show);

/* Edit tag. */
router.get("/edit/:id", tagsController.edit);

/* Update tag. */
router.post("/update", tagsController.update);

module.exports = router;
