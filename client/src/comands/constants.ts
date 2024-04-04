export enum SLASH_COMMANDS {
  TASK = 'task',
  START = 'start',
  STOP = 'stop',
  TASK_LIST = 'tasks',
}

export const COMMANDS = [
  {
    name: SLASH_COMMANDS.TASK,
    description: 'Опишите название задачи для парсинга сообщений',
    options: [
      {
        name: 'server',
        description: 'Отправьте id сервера',
        type: 3,
        required: true,
      },
      {
        name: 'channel',
        description: 'Отправьте id канала',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: SLASH_COMMANDS.STOP,
    description: 'Остановить задачи',
  },
  {
    name: SLASH_COMMANDS.START,
    description: 'Запустить задачи',
  },
  {
    name: SLASH_COMMANDS.TASK_LIST,
    description: 'Посмотреть список задач',
  },
];
