# yPush
#### Simplifying developer alerts <3


## ADVANTAGES
This package allows you to create a Cloud Function inside GCP to push alerts to your own channel in Telegram. This way you don't have to maintain the Telegram API inside every microservice. Just one your personal GCF and token to send small bits and pieces to your phone.

## INSTALL

- Make sure you the gcloud CLI + beta component are installed and set up ([auth, project...](https://cloud.google.com/sdk/gcloud/reference/config/set))
- Duplicate _config-demo.yaml_ to _config.yaml_
- Replace `WEBHOOK_TOKEN` in _config.yaml_ with a secure token for your application
- Text [@BotFather](http://t.me/BotFather) to make a new Bot
- Copy the token you've received from [@BotFather](http://t.me/BotFather) to config.yaml -> `TELEGRAM_BOT_TOKEN`
- Create a new private Channel on Telegram (your messages will be posted there)
- Go to your Channel -> Admins -> Add Admin and add your bot
- Open [web.telegram.org](https://web.telegram.org) and click on your channel. In the URL you will see something like this:   `.../#/im?p=c1234567890_1234567890123456789`
- Copy the numbers after  `?p=c` but before the `_` underscore. Paste it to _config.yaml_ -> `TELEGRAM_CHANNEL_NAME`
- Add `-100` to the beginning so it looks something like this: `-1001234567890`
- Run `npm start` to deploy your function.
- _gcloud_ CLI will return an url like this: https://europe-west1-PROJECT-NAME.cloudfunctions.net/telegramWebhook

## POST
Now let's post stuff to this endpoint. Simply build a JSON object and send it to your cloudfunctions URL from above:
```
{
	"text": "Hello world.",
	"token": "YOUR_TOKEN_HERE"
}
```

To make text more readable in Telegram, you can use their [Markdown Style](https://core.telegram.org/bots/api#markdown-style) to format your messages. For example:
```
_DEV_: *my-microservice-name*: Error something something happened`
```
which results in:  
> _DEV_: **my-microservice-name**: Error something something happened`


#### POST RESPONSE
You may want to handle HTTP response codes within your microservice:
- `200` Request fulfilled
- `400` Request invalid (most likely due to wrong text)
- `403` Wrong Token
- `500` Telegram Error (JSON output will be returned)



## LICENSE

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## AUTHOR

- **Daniel Freytag** - [Github](https://github.com/FRYTG) / [Twitter](https://twitter.com/FRYTG)
