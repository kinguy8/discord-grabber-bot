import { BotState } from '../interfaces';

export const stopTasks = (state: BotState, callback?: () => void) => {
  state.taskIsActive = false;
};
