export interface BotState {
  isStarted: boolean;
  serverId: string;
  channelId: string;
  taskIsActive: boolean;
  tasks: any[];
}
