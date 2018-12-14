var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Nikah = require('../models/nikah');
const moment_tz = require('moment-timezone');

/* GET admins dashboard listing. */
router.get('/', async function(req, res, next) {
  if (req.session.current_user) {
    const nikahs = await Nikah.find();
    console.log(nikahs)
    res.render('admin/index', { title: 'Pendaftaran Nikah || Admin Page', user: req.session.current_user, nikahs, moment_tz });
  } else {
    res.render('admin/login', { title: 'Pendaftaran Nikah || Admin Page' });
  }
});

/* GET logout admin. */
router.get('/logout', function(req, res, next) {
  delete req.session.current_user
  res.redirect('/admins')
});

/* POST login admin. */
router.post('/', async function(req, res, next) {
  const {username, password, email} = req.body

  if ((username || email) && password) {
    const user = await User.findOne({$or: [{username}, {email}], password})
    if (user) {
      req.session.current_user = user
      // res.status(200).json({ status: "success", message: "Login successfully" })
      res.redirect('/admins')
    } else {
      res.status(400).json({ status: "error", message: "Login not successfully" })
    }
  } else {
    res.status(403).json({ status: "error", message: "Not authorized" })
  }
})

/* Create / generate user admin as default. */
router.post('/create', async function(req, res, next) {
  try {
    let user = await User.findOne({ username : "admin" })
    if (user) {
      res.status(200).json({ status: "success", message: "User already created" })
    } else {
      await User.create({
        name : "Afif Abdillah Jusuf",
        email: "bungambohlah@gmail.com",
        username: "admin",
        password: "admin"
      })
      res.status(200).json({ status: "success", message: "User created" })
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: "Can't create user" })
  }
})

module.exports = router;
