export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt kiritilmadi' });
  }

  // API kalitingizni shu yerga yozasiz:
  const apiKey = "AQ.Ab8RN6KEn4_hCEuJF08UOvnKlJ_IpcyOTfUDrl2z1kTQdO87HQ";

  try {
    const apiResponse = await fetch(https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await apiResponse.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: "Server bilan ulanishda xatolik yuz berdi." });
  }
}