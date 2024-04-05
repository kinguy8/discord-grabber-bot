export const getTasks = async () => {
  console.log('before fetching...');
  const response = await fetch(`${process.env.BASE_URL}/api/v1/tasks`);
  const data = await response.json();
  console.log('data ===== ', data);
  return data;
};
