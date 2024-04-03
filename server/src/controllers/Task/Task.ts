import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TaskModel } from '../../models';

class TaskController {
  createTask = async (req: Request, res: Response) => {
    const { name, serverId } = req.body;

    if (!name || !serverId) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Не передано название сервера' });
    }

    const newTask = await TaskModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ task: newTask, msg: 'Task has been created!' });
  };

  getTasks = async (req: Request, res: Response) => {
    const tasks = await TaskModel.find({});
    res.status(StatusCodes.OK).json({ tasks, msg: 'All Tasks have been fetched!' });
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Не передан id' });
    }

    await TaskModel.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({ task: id.toString(), msg: 'Task was deleted' });
  };

  deactivateTask = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Не передан id' });
    }

    const response = await TaskModel.updateOne({ _id: id }, { isActive: false });
    res.status(StatusCodes.OK).json({ task: response, msg: 'Task was deactivate' });
  };

  activateTask = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Не передан id' });
    }

    await TaskModel.updateOne({ _id: id }, { isActive: true });
    res.status(StatusCodes.OK).json({ task: id.toString(), msg: 'Task was activate' });
  };
}

export const taskController = new TaskController();
