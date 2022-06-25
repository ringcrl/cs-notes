import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// general
router.get('/hello', controller.general.helloWorld);

// crud
router.post('/crud/create', controller.crud.create);
router.get('/crud/retrieve/:id', controller.crud.retrieve);
router.put('/crud/update', controller.crud.update);
router.delete('/crud/delete/:id', controller.crud.delete);

export { router };
