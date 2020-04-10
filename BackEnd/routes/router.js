var express = require('express');
var router = express.Router();
var User = require('../models/user');

//POST route for updating data
router.post('/', function (req, res, next) {
  

  if (req.body.email &&
    req.body.username &&
    req.body.password) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        // return res.redirect('/profile');
        return res.status(201).send(user).json();
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error({ message: 'Wrong email or password.' });
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;

        return res.status(200).send(user).json();
      }
    });
  } else {
    var err = new Error({ message: 'All fields required.' });
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = { message: 'Not authorized! Go back!' };
          err.status = 400;

          return res.status(400).send(err).json();
        } else {

          return res.status(200).send(user).json();
        }
      }
    });
});



router.get('/logout', function (req, res, next) {
  if (req.session) {

    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {

        var message = { message: 'Logged Out' };
        return res.status(200).send(message).json();
      }
    });
  }
});

module.exports = router;