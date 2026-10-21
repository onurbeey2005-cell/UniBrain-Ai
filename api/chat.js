export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt kiritilmadi' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API kalit topilmadi (AQ.Ab8RN6KwH3LofzluYlJmloj0gTEp6589mVX59VU-vwhqI9akWQ)' });
  }

  try {
    // Xatolik to'g'irlandi: URL manziliga backtick (``) qo'shildi
    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Javob olinmadi";
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: "Server bilan ulanishda xatolik yuz berdi" });
  }
}
