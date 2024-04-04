export const getChannelData = async (id: string) => {
  const response = await fetch(`https://discordapp.com/api/v6/channels/${id}`, {
    headers: {
      Authorization: `${process.env.USER_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};
