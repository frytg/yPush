# yPush
#### Simplifying developer alerts <3


## INSTALL

- Make sure you have gcloud CLI installed and set up
- Duplicate _config-demo.yaml_ to _config_yaml_
- Replace `WEBHOOK_TOKEN` in _config.yaml_ with a secure token for your application
- Text [@BotFather](http://t.me/BotFather) to make a new Bot
- Copy the token you've received from [@BotFather](http://t.me/BotFather) config.yaml -> `TELEGRAM_BOT_TOKEN`
- Create a new private Channel on Telegram
- Go to your Channel -> Admins -> Add Admin and add your bot
- Open [web.telegram.org](https://web.telegram.org) and click on your channel. In the URL you will see something like this:   `.../#/im?p=c1234567890_1234567890123456789`
- Copy the first part after the `c` but before the `_` underscore. Paste it to _config.yaml_ -> `TELEGRAM_CHANNEL_NAME`
- Add `-100` to the beginning so it looks something like this: `-1001234567890`
- Run `npm start` to deploy your function.
- In the end you will receive an url like this: https://europe-west1-PROJECT-NAME.cloudfunctions.net/telegramWebhook

## POST

Now let's post stuff to this endpoint. Simply build a JSON object and send it to your cloudfunctions URL from above:
```
{
	"text": "test",
	"token": "YOUR_TOKEN_HERE"
}
```

To make text more readable in Telegram, you can use Markdown to format your messages. For example:
```
_DEV_: *my-microservice-name*: Error something something happened`
```
which results in:
_DEV_: *my-microservice-name*: Error something something happened`
