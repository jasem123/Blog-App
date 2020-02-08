var express = require('express');
var router = express.Router();
const db = require('../models/index');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('admin/users' , {users : await db.User.findAll()})
});

module.exports = router;
