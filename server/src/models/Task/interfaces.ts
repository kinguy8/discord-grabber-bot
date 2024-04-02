export interface Task {
  name: string;
  creationDate?: string;
  isActive?: boolean;
  channelId: string;
  serverId: string;
  description?: string;
}
