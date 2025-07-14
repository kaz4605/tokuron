export async function callGPTAPI(data: object, token: string) {
  const apiUrl = 'https://models.github.ai/inference/chat/completions';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify(data);
  const response = await fetch(apiUrl, { method: 'POST', headers, body });
  return response;
}


