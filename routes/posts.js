var express = require("express");
var router = express.Router();
const db = require("../models/index");
/* GET users listing. */
router.get("/", async function(req, res, next) {
  // res.send(await db.Post.findAll({include : [db.User , db.Category , db.Tag]}));
  res.render("admin/posts", {
    posts: await db.Post.findAll({ include: [db.User, db.Category , db.Tag] })
  });
});

router.get("/create", async function(req, res) {
  res.render("admin/createPost", {
    categories: await db.Category.findAll(),
    tags: await db.Tag.findAll(),
    users: await db.User.findAll()
  });
});

router.post("/create", async function(req, res) {

 let post = await db.Post.create(req.body);
 await post.setTags(req.body.tagId);
  res.redirect("/posts");
});

router.get("/delete/:id", async function(req, res) {
  await db.Post.destroy({ where: { id: req.params.id } });
  res.redirect("/posts");
});

router.get("/show/:id", async function(req, res) {
  res.render("admin/showPost", { post: await db.Post.findByPk(req.params.id) });
});

router.get("/edit/:id", async function(req, res) {
  res.render("admin/editPost", {
    post: await db.Post.findByPk(req.params.id),
    categories: await db.Category.findAll()
  });
});

router.post("/update", async function(req, res) {
  await db.Post.update(req.body, { where: { id: req.body.id } });
  res.redirect("/posts");
});

module.exports = router;
