module.exports = {
    mainMenu: (text, chatId) => {
           reply_markup: JSON.stringify({
                keyboard: [['Начать работу', 'Закончить работу'], ['Отчет', 'Режим админа']],
                resize_keyboard: true,
                one_time_keyboard: false,
                force_reply: true,
            })
    },
    reportMenu: (text, chatId) => {
            reply_markup: JSON.stringify( {
                inline_keyboard: [[
                    {
                        text: 'Сегодня',
                        callback_data: 'За сегодня'
                    }, {
                        text: 'Месяц',
                        callback_data: 'За месяц'
                    }, {
                        text: 'Год',
                        callback_data: 'За год'
                    }
                ]]
            })
        }
}