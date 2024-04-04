export const deactivateTask = async (id: string, callback?: () => void) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/v1/task/deactivate`, {
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
