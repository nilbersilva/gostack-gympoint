import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import StudentSessionController from './app/controllers/StudentSessionController';
import StudentHelpOrdersController from './app/controllers/StudentHelpOrdersController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Register
routes.post('/users', UserController.store);
// Login - Get Token
routes.post('/session', SessionController.store);

// No need for authentication
routes.get('/students/session', StudentSessionController.index);
routes.get('/students/:studentId/checkins', CheckinController.index);
routes.post('/students/:studentId/checkins', CheckinController.store);

routes.post(
  '/students/:studentId/help-orders',
  StudentHelpOrdersController.store
);
routes.get(
  '/students/:studentId/help-orders',
  StudentHelpOrdersController.index
);

// Only Logged on Users from this point
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// Students CRUD - no DELETE
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students', StudentController.delete);

// Plans CRUD
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans', PlanController.delete);

// Enrollments CRUD
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:enrollmentId', EnrollmentController.update);
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/help-orders/:id', HelpOrderController.index);

routes.put('/help-orders/:helpOrderId/answer', HelpOrderController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
