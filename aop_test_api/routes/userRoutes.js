const Router = require('koa-router');
const userController = require('../controllers/userController');

const router = new Router({ prefix: '/api/users' });

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router.routes();
