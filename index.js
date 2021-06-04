const TgBot = require('node-telegram-bot-api')

const token =  '1821273728:AAGMuFBcK8-RzXKZFg9G0A8noyMmSmcvUzY'
// включаем самого обота
const bot = new TgBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Хочу кота', // текст на кнопке
        callback_data: 'moreKeks' // данные для обработчика событий
      }
    ],
    [
        {
          text: 'Хочу песика',
          callback_data: 'morePes'
        }
    ],
    [
        {
          text: 'Хочу проходить курсы',
          url: 'https://htmlacademy.ru/continue' //внешняя ссылка
        }
      ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'moreKeks') { // если кот
        img = 'index.jpg';
    }

    if (query.data === 'morePes') { // если пёс
        img = 'indexd.jpg';
    }

    if (img) {
        bot.sendPhoto(chatId, img, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });