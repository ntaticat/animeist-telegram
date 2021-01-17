const fetch = require("node-fetch");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOTFATHER_TOKEN;
const bot = new TelegramBot(token, {  polling: true });

// nuevo anime a la lista
bot.onText(/\/new (.+)/, async (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];
    const valores = resp.split("-");

    const nombre = valores[0].trim().toString().toUpperCase();
    const estado = valores[1].trim().toString();

    const apiURL = "https://blooming-river-33407.herokuapp.com/anime";

    let data = {
        nombre,
        estado
    }

    fetch(apiURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);

            if(res.ok) {
                bot.sendMessage(chatId, `
                El anime "${res.anime.nombre}" se ha registrado exitosamente
                `);
            }
        })
        .catch(err => {
            console.log("Hubo un error... "  + err);
            bot.sendMessage(chatId, "No se pudo insertar el nuevo registro");
        });
});

// listar animes
bot.onText(/\/list (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, "Lista los animes agregados");
});

// Editar anime
bot.onText(/\/edit (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, "Edita información de los animes");
});

// Eliminar anime
bot.onText(/\/delete (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, "Elimina el anime de la lista");
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Mensaje Recibido");
});

bot.on("sticker", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Oh, un sticker");
});