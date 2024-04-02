import { Schema, model } from 'mongoose';

import { Task } from './interfaces';

export const taskSchema = new Schema<Task>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name should not be empty!'],
    },
    creationDate: {
      type: String,
      default: Date.now(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    channelId: {
      type: String,
      required: [true, 'ChannelId should not be empty!'],
    },
    serverId: {
      type: String,
      required: [true, 'ServerId should not be empty!'],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);
