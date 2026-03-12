import { ChatResponse } from "../types/resources";

export async function processChatMessage(message: string, history: { role: string, content: string }[]): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401 && errorData.error === 'GROQ_API_KEY_MISSING') {
        throw new Error('GROQ_API_KEY_MISSING');
      }
      throw new Error(errorData.error || 'Failed to process chat message');
    }

    return await response.json();
  } catch (error) {
    console.error("Chat Service Error:", error);
    throw error;
  }
}
