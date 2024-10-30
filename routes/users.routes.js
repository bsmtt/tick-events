var express = require('express');
var router = express.Router();
const authController = require('../controllers/Site/Auth/auth.contoller');
const { userAuth } = require('../middlewares/user.auth');
const newEventControllers = require('../controllers/Site/newEvent.controllers');
const bookControllers = require('../controllers/Site/book.controllers');
const adminAuth = require('../middlewares/admin.auth');

router.post('/signup', authController.signUp);
router.get('/events', newEventControllers.index);
router.get('/events/:id', newEventControllers.show);
router.patch('/events/book/:id', adminAuth, bookControllers.store);
router.get('/my-events', adminAuth, bookControllers.index);

module.exports = router;
