export const getTasks = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/tasks`);
  const data = await response.json();
  return data;
};
