export const getMovieInsight = async (movieTitle, overview) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: 'user',
            content: `You are a movie expert. For the movie "${movieTitle}", give a 2-3 sentence insight about why someone should watch it. Here's the overview: ${overview}. Be engaging and concise.`
          }
        ]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI error:', error);
    return 'AI insight unavailable at the moment.';
  }
};