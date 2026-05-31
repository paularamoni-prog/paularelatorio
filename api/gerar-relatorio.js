  }

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt ausente.' });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro Anthropic:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Erro na API Anthropic.' });
    }

    const texto = data.content?.[0]?.text || '';
    return res.status(200).json({ texto });

  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno ao gerar relatório.' });
  }
}

