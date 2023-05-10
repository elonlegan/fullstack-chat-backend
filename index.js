require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post('/me', async (req, res) => {
	const {
		nickname: username,
		email: secret,
		family_name: last_name,
		given_name: first_name,
		picture: avatar,
		email,
	} = req.body;

	try {
		const r = await axios.put(
			'https://api.chatengine.io/users/',
			{
				username,
				secret,
				first_name,
				last_name,
				email,
			},
			{
				headers: {
					'Private-Key':
						process.env.CHAT_ENGINE_PRIVATE_KEY,
				},
			}
		);

		return res.status(r.status).json(r.data);
	} catch (e) {
		return res
			.status(e.response.status)
			.json(e.response.data);
	}
});

// Docs at rest.chatengine.io
// vvv On port 3001!
app.listen(3001);
