const Router = require('koa-router');
const jobController = require('../controllers/jobController');

const router = new Router({ prefix: '/api/jobs' });

router.get('/', jobController.getJobList);
router.get('/:id', jobController.getJobDetail);

module.exports = router.routes();
