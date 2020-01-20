const exp = require('express');
const router = exp.Router();
const {requireController} = require('../config');


const MainController = requireController('panel/MainController');
router.get('/', MainController.index);

const UserController = requireController('panel/UserController');
router.get('/users', UserController.index);
router.get('/user/create', UserController.create);
router.post('/user/create', UserController.save);
router.get('/user/edit/:id', UserController.edit);
router.post('/user/edit/:id', UserController.update);
router.post('/user/destroy/:id', UserController.destroy);


module.exports = router;
