require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
var morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(
	morgan('dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test',
	})
);

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

// start server
const port =
	process.env.NODE_ENV === 'production'
		? process.env.PORT || 80
		: 4000;
app.listen(port, () => {
	console.log('Server listening on port ' + port);
});
