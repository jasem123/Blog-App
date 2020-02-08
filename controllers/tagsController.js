
//include db
const db = require("../models/index");

/* Get tags listing. */
exports.get = async function(req, res, next) {
  // res.send(await db.Tag.findAndCountAll({limit : 3 , offset : Number(req.params.id)}));
  res.render("admin/tags", {
    tags: await db.Tag.findAll({
      limit: 100,
      offset: 1,
      order: [["name", "DESC"]]
    })
  });
};


/* Get create tag. */
exports.create = function(req, res) {
  res.render("admin/createTag");
};

/* Save tag. */
exports.save = async function(req, res) {
  await db.Tag.create(req.body);
  res.redirect("/tags");
};

/* Delete tag. */
exports.delete = async function(req, res) {
  await db.Tag.destroy({ where: { id: req.params.id } });
  res.redirect("/tags");
};

/* Show tag. */
exports.show = async function(req, res) {
  res.render("admin/showTag", { tag: await db.Tag.findByPk(req.params.id) });
};

/* Edit tag. */
exports.edit = async function(req, res) {
  res.render("admin/editTag", { tag: await db.Tag.findByPk(req.params.id) });
};

/* Update tag. */
exports.update = async function(req, res) {
  await db.Tag.update(req.body, { where: { id: req.body.id } });
  res.redirect("/tags");
};
