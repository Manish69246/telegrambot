const TelegramBot = require('node-telegram-bot-api');

// Replace with your own Telegram Bot token
const token = '6892726583:AAHgm_VJt5Aw9-91yH05ifjxjlc-QLQdLoU';
const bot = new TelegramBot(token, { polling: true });

// Define the URL to your JSON data hosted on 'digitalbundlekit.in'
const dataUrl = 'https://hotlinesamachar.com/your-json-data.json';

// Define the JSON data as a JavaScript object
const jsonData = [
  "encrypted_data_1",
  "encrypted_data_2",
  "encrypted_data_3"
];

// Listen for /allow and /disallow commands
bot.onText(/\/allow (.+)/, (msg, match) => {
  // Add the domain to the allowedDomains array
  const domain = match[1].toLowerCase();
  if (!jsonData.includes(domain)) {
    jsonData.push(domain);
    bot.sendMessage(msg.chat.id, `Access to ${domain} has been allowed.`);
  } else {
    bot.sendMessage(msg.chat.id, `Access to ${domain} is already allowed.`);
  }
});

bot.onText(/\/disallow (.+)/, (msg, match) => {
  // Remove the domain from the allowedDomains array
  const domain = match[1].toLowerCase();
  const index = jsonData.indexOf(domain);
  if (index !== -1) {
    jsonData.splice(index, 1);
    bot.sendMessage(msg.chat.id, `Access to ${domain} has been disallowed.`);
  } else {
    bot.sendMessage(msg.chat.id, `Access to ${domain} is not in the allowed list.`);
  }
});

bot.onText(/\/list/, (msg) => {
  // List the allowed domains
  bot.sendMessage(msg.chat.id, `Allowed domains: ${jsonData.join(', ')}`);
});
