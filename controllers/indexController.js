//include db
const db = require("../models/index");
//include bkfd2Password
const bkfd2Password = require("pbkdf2-password");
//call bkfd2Password
const hasher = bkfd2Password();
//salt
const salt = "oday";
//include email
const transporter = require("../helper/email");

/* GET home page. */
exports.home = async function(req, res, next) {
  res.render("home", { posts: await db.Post.findAll() });
};

/* GET login page. */
exports.login = (req, res, next) => {
  res.render("login");
};

/* Post login page. */
exports.loginPost = async (req, res, next) => {
  let user = await db.User.findOne({ where: { email: req.body.email } });

  hasher({ password: req.body.password, salt: salt }, async function(
    err,
    password,
    salt,
    hash
  ) {
    if (user.password === hash) {
      req.session.user = user;

      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
};

/* GET Register page. */
exports.register = (req, res, next) => {
  res.render("register");
};


/* Post Register page. */
exports.registerPost = async (req, res, next) => {
  hasher({ password: req.body.password, salt: salt }, async function(
    err,
    password,
    salt,
    hash
  ) {
    req.body.password = hash;
    let user = await db.User.create(req.body);
    req.session.user = user;
    var mailOptions = {
      from: "nodejsps@gmail.com",
      to: user.email,
      subject: "Sending Email using Node.js",
      text: "That was easy!"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.redirect("/");
  });
};

/* GET Post page. */
exports.post = async (req, res, next) => {
  res.render("post", {
    post: await db.Post.findByPk(req.params.id, {
      include: [db.Category, db.User]
    })
  });
};

/* Logout */
exports.logout = (req, res, next) => {
  req.session.destroy(err => {});
  res.redirect("/login");
};
