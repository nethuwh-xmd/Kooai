import fetch from "node-fetch";

const OPENAI_API_KEY = "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";

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
