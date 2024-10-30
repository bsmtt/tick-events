var express = require('express');
var router = express.Router();
const adminAuth = require('../middlewares/admin.auth')
const authController = require('../controllers/Admin/Auth/auth.contoller')
const hostController = require('../controllers/Admin/host.controllers')
const newEventController = require('../controllers/Admin/newEvent.controllers');
const roomControllers = require('../controllers/Admin/room.controllers');
const speakerControllers = require('../controllers/Admin/speaker.controllers');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

router.post('/events', adminAuth, newEventController.store);

router.post('/hosts', adminAuth, hostController.store);
router.get('/hosts', adminAuth, hostController.index);  
router.get('/hosts/:id', adminAuth, hostController.show);
router.put('/hosts/:id', adminAuth, hostController.update);
router.delete('/hosts/:id', adminAuth, hostController.delete);

router.get('/rooms', adminAuth, roomControllers.index);
router.post('/rooms', adminAuth, roomControllers.store);

router.get('/speakers', adminAuth, speakerControllers.index);
router.post('/speakers', adminAuth, speakerControllers.store);

module.exports = router;
