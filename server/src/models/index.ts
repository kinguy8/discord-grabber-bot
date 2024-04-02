import { Schema, model } from 'mongoose';

import { taskSchema, Task } from './Task';

export const TaskModel = model<Task>('Todo', taskSchema);
