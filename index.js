const TelegramApi = require('node-telegram-bot-api')
const token = "5257845075:AAE8WwJPVX-o_CB1shV1U4fncsVceFtwZoM"
const bot = new TelegramApi(token, {polling: true})
const {mainMenu, reportMenu} = require('./options')


const options = {
    reply_markup: JSON.stringify({
        keyboard: [
            [[{text:'Первая кнопка', callback_data: 'dsc'}], [{text:'Вторая кнопка', callback_data: 'dsc'}]]
        ]
    })
}
let workRange = "";
let goWork = true;

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text == "/start" || text == "Назад") {
            return mainMenu(text, chatId);
        }
        if (text == 'Начать работу') { 
            if (goWork) {
                let date = new Date();
                let startTime = date.toLocaleTimeString().slice(0,-3)
                workRange = `${date.toLocaleDateString()}\nНачало работы: ${startTime}`;
                goWork = false
                return bot.sendMessage(chatId, workRange);
            } else {
                return bot.sendMessage(chatId, 'Ты уже начал работу, как ты можешь ее снова начать?')
            }
        }
        if (text == 'Закончить работу') {
            if (!goWork) {
                let date = new Date();
                let endTime = date.toLocaleTimeString().slice(0,-3)
                goWork = true
                return bot.sendMessage(chatId, workRange+ `\nКонец работы: ${endTime}`);
            } else {
                return bot.sendMessage(chatId, 'Ты еще не начал работу, как ты можешь ее закончить?')
            }
        }
        if (text == 'Отчет') {
            return reportMenu(text, chatId);
        }
        return bot.sendMessage(chatId, 'Би-буп, я робот, ничего не понимаю')
      });
}
start()