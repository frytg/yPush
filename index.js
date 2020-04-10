/*

	yPush

	AUTHOR		Daniel Freytag
			https://github.com/FRYTG
			https://twitter.com/FRYTG

*/


var fetch 		= require('node-fetch')


const telegramWebhook = async function(req, res) { try {
	// check token
	if(req.body.token != process.env.WEBHOOK_TOKEN) {
		res.sendStatus(403)
		return Promise.resolve()
	}

	// check text length
	if(req.body.text.length < 1) {
		res.sendStatus(400)
		return Promise.resolve()
	}


	// build options
	let options = {
		url:	'https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage',
		method: 'POST',
		body:	JSON.stringify({
			"parse_mode":	"Markdown",
			"chat_id":	process.env.TELEGRAM_CHANNEL_NAME,
			"text":		req.body.text
		}),
		headers:	{ 
			'Content-Type':	'application/json',
			'User-Agent':	'yPush/1.0.1'
		}
	}

	// send request
	let post = await fetch(options.url, options)
	
	
	// handle errors
	if(post.status != 200) {
		let text = await post.text()
		console.error("yPush: " + text)
	}

	return Promise.resolve()

} catch(err) {
	console.error({err})
} }

exports.telegramWebhook = (req, res) => {
	telegramWebhook(req, res)
}
