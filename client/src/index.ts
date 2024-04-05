import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  REST,
  Routes,
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Interaction,
  CacheType,
} from 'discord.js';
import 'dotenv/config';
import { startPollingMessages } from 'disgrab-messages';
import { COMMANDS, startTasks, stopTasks, SLASH_COMMANDS } from './comands';
import { initState } from './state';
import { getTasks, addTask, deleteTask, deactivateTask, activateTask } from './api/task';
import { getGuildData, getChannelData } from './api/discord';

const stateMachine = initState;

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const finallyCallback = async () => {
  stateMachine.taskIsActive = false;
  const taskList = await getTasks();
  stateMachine.tasks = taskList.tasks ?? [];
};

client.on('interactionCreate', async (interaction: Interaction<CacheType>) => {
  if (interaction.isCommand()) {
    const { commandName, user } = interaction;

    console.log('commandName is ', commandName);

    if (user.id !== process.env.ACCESS_USER_ID) {
      interaction.reply({ content: 'Доступ запрещен' });
      return;
    }

    if (commandName === SLASH_COMMANDS.START) {
      if (!stateMachine.tasks.length) {
        interaction.reply({ content: 'Список задач пуск. Создайте задачу с помощью команды /task' });
      } else {
        startTasks(stateMachine);
        stateMachine.taskIsActive = true;
        interaction.reply({ content: 'Задачи запущены' });
      }
    }

    if (commandName === SLASH_COMMANDS.STOP) {
      stopTasks(stateMachine, () => console.log('stop!'));
      interaction.reply({ content: 'Выполнение задач остановлено, для запуска отправьте команду - /start' });
    }

    if (commandName === SLASH_COMMANDS.TASK_LIST) {
      let promises = [];

      for (let taskIdx = 0; taskIdx < stateMachine.tasks.length; taskIdx++) {
        const task = stateMachine.tasks[taskIdx];
        if (task.name) {
          //@ts-ignore
          promises.push(task.channelId);
          //const response = await getGuildData(task.serverId);
        }
      }
      const allData = await Promise.all(promises.map((id) => getChannelData(id)));

      const messages = allData.map((data, idx) =>
        new EmbedBuilder().setTitle(
          `Задача - ${stateMachine.tasks[idx].name}, подписанная на канал ${data.name}, в статусе "${
            stateMachine.tasks[idx].isActive ? 'запущена' : 'остановлена'
          }"`,
        ),
      );

      const components = allData.map((_, idx) =>
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId(
              stateMachine.tasks[idx].isActive
                ? `disactive_${stateMachine.tasks[idx]._id}`
                : `active_${stateMachine.tasks[idx]._id}`,
            ) //workaround
            .setLabel(stateMachine.tasks[idx].isActive ? 'Диактивировать' : 'Активировать')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId(`delete_${stateMachine.tasks[idx]._id}`)
            .setLabel('Удалить')
            .setStyle(ButtonStyle.Danger),
        ),
      );

      messages.forEach((mes, idx) => {
        //@ts-ignore
        client.channels.cache.get(process.env.MAIN_GUILD_ID).send({ embeds: [mes], components: [components[idx]] });
      });

      interaction.reply({ content: 'Список получен' });
    }

    if (commandName === SLASH_COMMANDS.TASK) {
      const server = interaction.options.get('server')?.value?.toString() ?? '';
      const channel = interaction.options.get('channel')?.value?.toString() ?? '';
      const response = await getGuildData(server);

      if (response) {
        stateMachine.serverId = server;
        stateMachine.channelId = channel;
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(response.name)
          .setImage(`https://cdn.discordapp.com/icons/${server}/${response.icon}.png`);
        interaction.reply({
          embeds: [exampleEmbed],
          content: `Вы ввели адрес сервера ${server} и канал ${channel}`,
          components: [
            //@ts-ignore
            new ActionRowBuilder().setComponents(
              new ButtonBuilder().setCustomId('agree').setLabel('Верно').setStyle(ButtonStyle.Primary),
              new ButtonBuilder().setCustomId('disagree').setLabel('Нет').setStyle(ButtonStyle.Danger),
            ),
          ],
        });
      }

      if (!response) {
        interaction.reply({ content: 'Ничего не найдено' });
      }
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'agree') {
      const task = await addTask(stateMachine, `задание ${Math.floor(Math.random() * 99999)}`, finallyCallback);
      if (task.task.name) {
        interaction.reply({ content: 'Задача создана' });
      }
    }

    if (interaction.customId.toString().includes('_')) {
      const [type, id] = interaction.customId.toString().split('_');

      if (type === 'disactive') {
        const response = await deactivateTask(id, finallyCallback);
        if (response) {
          //@ts-ignore
          client.channels.cache
            .get(process.env.MAIN_GUILD_ID as string)
            //@ts-ignore
            .send('Задача диактивирована (Все задачи были приостановлены, воспользуйтесь командой /start)');
        }
      }

      if (type === 'active') {
        const response = await activateTask(id, finallyCallback);
        if (response) {
          interaction.reply({
            content: 'Задача снова активна (Все задачи были приостановлены, воспользуйтесь командой /start)',
          });
        } else {
          interaction.reply({ content: 'Что-то пошло не так' });
        }
      }

      if (type === 'delete') {
        const response = await deleteTask(id, finallyCallback);
        if (response) {
          interaction.reply({
            content: 'Задача удалена (Все задачи были приостановлены, воспользуйтесь командой /start)',
          });
        } else {
          interaction.reply({ content: 'Что-то пошло не так' });
        }
      }
    }
  }
});

client.on('ready', async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  const taskList = await getTasks();
  stateMachine.tasks = taskList.tasks ?? [];

  let tasksMessages = {};
  const sendMessage = (message: any) => {
    //@ts-ignore
    client.channels.cache.get(process.env.GUILD_ID_STORE).send(message);
  };

  // startPollingMessages('2', stateMachine, sendMessage, process.env.USER_TOKEN, tasksMessages);
});

const main = async () => {
  try {
    console.log('try to connect');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), {
      body: COMMANDS,
    });

    client.login(process.env.BOT_TOKEN);
    console.log('after login');
  } catch (e) {
    console.log('e', e);
  }
};

export default main;
