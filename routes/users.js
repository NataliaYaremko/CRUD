const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

let users = require('./../data/users.json');

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
/* GET users listing. Existing code
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
}); */

// My changes
router.get('/users', (req, res) => {
  res.render('users', { users });
});


router.get('users/:id', (req, res) => {
  const user = users.find(el => el.id === req.params.id);
  if (!user) return res.status(404).send('There is not such user!');
  res.json(user);
});

router.get('/users/:id', urlencodedParser, (req, res) => {
  if (req.params.id) {
    console.log(`${req.params.id} DELETED`);
    users = users.filter(el => el.id != req.params.id);
    res.render('users', { users });
  } else {
    res.render('users', { users });
    res.redirect('/users');
  }
});

router.post('/users', urlencodedParser, (req, res) => {
  const user = {};
  user.name = req.body.name;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.age = req.body.age;
  user.id = users.length + 1;
  users.push(user);
  res.render('users', { users });
});


router.post('/users/:id', urlencodedParser, (req, res) => {
  const userToEdit = users.find(user => user.id == req.params.id);
  userToEdit.name = req.body.name;
  userToEdit.lastname = req.body.lastname;
  userToEdit.email = req.body.email;
  userToEdit.age = req.body.age;
  res.render('users', { users });
  res.redirect('/users');
});

module.exports = router;
