import OpenAI from 'openai';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
type Bindings = {
	OPEN_AI_KEY: string;
	AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'/*',
	cors({
		origin: '*',
		allowHeaders: ['Content-Type', 'Upgrade-Insecure-Requests', 'X-Custom-Header'],
		allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
		exposeHeaders: ['X-Kuma-Revision', 'Content-Length'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/chat-to-document', async (c) => {
	const openai = new OpenAI({
		apiKey: c.env.OPEN_AI_KEY,
	});

	const { documentData, question } = await c.req.json();

	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `You are a helpful assistant that answers questions in the most clear and concise way about ${documentData}.`,
			},
			{
				role: 'user',
				content: `My question is: ${question}`,
			},
		],
		model: 'gpt-3.5-turbo',
		temperature: 0.5,
	});

	const response = chatCompletion.choices[0].message.content;

	return new Response(JSON.stringify({ message: response }));
});

app.post('/translate-document', async (c) => {
	const { documentData, targetLanguage } = await c.req.json();

	const summaryResponse = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
		max_length: 1000,
		input_text: documentData,
	});

	const response = await c.env.AI.run('@cf/meta/m2m100-1.2b', {
		text: summaryResponse.summary,
		target_lang: targetLanguage,
		source_lang: 'en',
	});

	return new Response(JSON.stringify(response));
});

export default app;
