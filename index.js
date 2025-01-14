import TelegramBot from 'node-telegram-bot-api';
const token = '7650135472:AAFwipJAxfJ1kOPBVC15L9C27ykVzHca-Ic'
import { gameMenuAgainOption, gameMenuOptions } from './options.js'
const bot = new TelegramBot( token, { polling: true } )
const chats = []

const playGame = async ( chatId ) => {
    await bot.sendMessage( chatId, 'Guess number from 0 to 9', gameMenuOptions )
    chats[ chatId ] = Math.floor( Math.random() * 10 )
    console.log( chats[ chatId ] )
    return
}

const start = () => {
    bot.setMyCommands([
        { command: "/start", description: "Greetings"},
        { command: "/info", description: "Info"},
        { command: "/game", description: "Play game guess number"},
    ])

    bot.on( 'message', async msg => {
        const chatId = msg.chat.id
        const text = msg.text

        // bot.sendMessage( chatId, text )

        if( text === '/start' )
        {
            await bot.sendSticker( chatId, 'https://ih1.redbubble.net/image.2957895003.6553/st,small,507x507-pad,600x600,f8f8f8.u5.jpg' )
            await bot.sendMessage( chatId, 'Greetings' )
            return
        }
        if( text === '/info' )
        {
            await bot.sendMessage( chatId, `You are ${msg.chat.first_name} ${msg.chat.last_name}`)
            return
        }
        if( text === '/game' )
        {
            playGame( chatId )
        }
        else
        {
            await bot.sendMessage( chatId, 'I dont understand you')
        }
    })

    bot.on( 'callback_query', async msg => {
        const answer = msg.data
        const chatId = msg.message.chat.id

        // console.log( answer )
        // console.log( chatId )

        if( answer == chats[ chatId ] )
        {
            await bot.sendMessage( chatId, `You are won. ${answer} bingo`, gameMenuAgainOption )
            return
        }
        if( answer === '/again' )
        {
            playGame( chatId )
        }
        else
        {
            await bot.sendMessage( chatId, `Not guess. ${answer} is wrong`, gameMenuAgainOption )
            return
        }
    })
}

start()

