import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { taskController } from './controllers/Task';
import { connectDB } from './mongoose';

const router = Router();
router.route('/task').post(taskController.createTask);
router.route('/tasks').get(taskController.getTasks);
router.route('/task/delete').post(taskController.deleteTask);
router.route('/task/deactivate').post(taskController.deactivateTask);
router.route('/task/activate').post(taskController.activateTask);

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//@ts-ignore
app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.get('/test', (req: Request, res: Response) => {
  console.log('it works');
  res.send('Page is work');
});

connectDB(() =>
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  }),
);
