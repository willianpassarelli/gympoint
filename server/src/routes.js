import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderAnswerController from './app/controllers/HelpOrderAnswerController';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validateHelpOrderStore from './app/validators/HelpOrderStore';
import validateHelpOrderAnswerStore from './app/validators/HelpOrderAnswerStore';
import validateEnrollmentStore from './app/validators/EnrollmentStore';
import validateEnrollmentUpdate from './app/validators/EnrollmentUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post(
  '/students/:id/help-orders',
  validateHelpOrderStore,
  HelpOrderController.store
);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.get('/help-orders/', HelpOrderAnswerController.index);
routes.post(
  '/help-orders/:id/answer',
  validateHelpOrderAnswerStore,
  HelpOrderAnswerController.store
);

routes.get('/students/:id', StudentController.index);

routes.use(authMiddleware);

routes.post('/students', validateStudentStore, StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', validatePlanStore, PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.index);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollment', validateEnrollmentStore, EnrollmentController.store);
routes.get('/enrollment', EnrollmentController.index);
routes.get('/enrollment/:id', EnrollmentController.index);
routes.put(
  '/enrollment/:id',
  validateEnrollmentUpdate,
  EnrollmentController.update
);
routes.delete('/enrollment/:id', EnrollmentController.delete);

export default routes;
