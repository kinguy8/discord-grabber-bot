export const createTask = async (channelId: string, serverId: string, name: string) => {
  const payload = {
    name,
    channelId,
    serverId,
  };

  const response = await fetch(`${process.env.BASE_URL}/api/v1/task`, {
    body: JSON.stringify(payload),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
