export function getUser() {
  const storage = localStorage.getItem('vlkzmn_chat_user');

  return JSON.parse(storage);
}
