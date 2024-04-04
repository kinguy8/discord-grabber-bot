import { BotState } from '../interfaces';

export const startTasks = (state: BotState, callback?: () => void) => {
  state.taskIsActive = true;
};
