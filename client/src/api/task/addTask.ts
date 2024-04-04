import { BotState } from '../../interfaces';

export const addTask = async (state: BotState, name: string, callback?: () => void) => {
  try {
    const payload = {
      name,
      channelId: state.channelId,
      serverId: state.serverId,
    };
    console.log('berfore', process.env.BASE_URL);
    const response = await fetch(`${process.env.BASE_URL}/api/v1/task`, {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('after', response);

    const data = await response.json();
    console.log('after', data);
    return data;
  } catch (e) {
    console.log('error');
  } finally {
    callback?.();
  }
};
