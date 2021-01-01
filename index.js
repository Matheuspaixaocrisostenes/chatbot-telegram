const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1491675392:AAEIDy77kyOzFh1aQQNb6wL36UdOcxMKdM4';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    
    const chatId = msg.chat.id;

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let textResponse = dfResponse.text;
    
    if (dfResponse.intent === 'Treino específico') {
        textResponse = await youtube.searchVideoURL(textResponse, dfResponse.fields.corpo.stringValue);
    }
    
    bot.sendMessage(chatId, textResponse);
});