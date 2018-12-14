const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Nikah = require('../models/nikah');
const moment_tz = require('moment-timezone');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Pendaftaran Nikah' });
});

/* POST ajax register form nikah */
router.post('/register', async function(req, res, next) {
  body = req.body

  if (Object.keys(body).length > 0) {
    // cast to date format
    if (body.ttl)
      body.ttl = moment_tz(body.ttl, "DD/MM/YYYY").toDate();

    const new_form = new Nikah(body)
    try {
      await new_form.save();
      res.status(200).json({ status: "success", message: "Data saved." })
    } catch (error) {
      console.error(error)
      res.status(400).json({ status: "error", message: "Some data cannot be saved." })  
    }
  } else {
    res.status(400).json({ status: "error", message: "Data empty." })
  }
})

module.exports = router;
