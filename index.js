/*

	yPush

	GIT			https://github.com/frytg/yPush

	DEBUG		-> README.md

	AUTHOR		Daniel Freytag
				daniel@frytg.com
				https://twitter.com/FRYTG

	UPDATED		October 2018

*/


var request = require('request');


function telegramWebhook(req, res, payload) {
		try {
			if(payload.token != process.env.WEBHOOK_TOKEN) {
				res.sendStatus(403);
				return Promise.reject();
			}

			if(payload.text.length < 1) {
				res.sendStatus(500);
				return Promise.reject();
			}

			var options = {
			  uri: 'https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage',
			  method: 'POST',
			  json: {
				  "parse_mode": "Markdown",
				  "chat_id": process.env.TELEGRAM_CHANNEL_NAME,
				  "text": payload.text
			  }
			};

			request(options, function (error, response, body) {
				if (!error && response.statusCode != 200) {
					console.error('An error occured while making a POST request to Telegram.');
					console.error({ body });
					console.error({ error });
					console.error({ response });
					console.error({ options });

					res.status(500).json(body);
					return Promise.reject();

				} else {
					res.sendStatus(200);
					return Promise.resolve();

				}
			});

		} catch(err) {
			console.error({err});
		}

}

exports.telegramWebhook = (req, res) => {
	telegramWebhook(req, res, {token: req.body.token, text: req.body.text});
};
