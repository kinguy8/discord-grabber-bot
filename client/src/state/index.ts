import { BotState } from '../interfaces';

export const initState: BotState = {
  isStarted: false,
  serverId: '',
  channelId: '',
  taskIsActive: false,
  tasks: [],
};
