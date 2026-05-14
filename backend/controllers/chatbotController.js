const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chat = async (req, res) => {
  const { message } = req.body;
  const user = req.user;

  const userContext = user
    ? `User profile — Name: ${user.name}, Age: ${user.age || 'unknown'}, ` +
      `Gender: ${user.gender || 'unknown'}, Weight: ${user.weight_kg ? user.weight_kg + 'kg' : 'unknown'}, ` +
      `Height: ${user.height_cm ? user.height_cm + 'cm' : 'unknown'}, ` +
      `Fitness level: ${user.fitness_level || 'unknown'}, Goal: ${user.goal || 'unknown'}. ` +
      `Tailor your advice to this person.`
    : '';

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are CalixAI, an expert calisthenics fitness coach and nutritionist.
Help users with calisthenics exercises, diet advice, calorie management, and motivation.
Keep responses concise, practical and encouraging. Use bullet points when listing steps.
${userContext}`,
        },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { chat };
