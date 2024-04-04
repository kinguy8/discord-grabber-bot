export const activateTask = async (id: string, callback?: () => void) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/v1/task/activate`, {
      body: JSON.stringify({ id }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('error');
  } finally {
    callback?.();
  }
};
