const discord = require('discord.js');
const bot = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

const data = require('./bot.json');

bot.on("ready", function () {
    bot.user.setStatus("dnd");
    bot.user.setActivity("~help");
})


bot.on("messageCreate", function (mess) {
    if (mess.content.startsWith("~clear")) {
        mess.delete()
        mess.channel.bulkDelete(100)
    } else if (mess.content.startsWith("~help")) {
        mess.channel.send(
            "__Bienvenue dans l'antre de mes aides__\n" +
            "\n" +
            "> voici les différentes commandes : \n" +
            "> \n" +
            "> **~help** : affiche ce message \n" +
            "> **~clear** : supprime les 100 derniers messages \n" +
            "> **~BLG** : te dit que tu est belle gosse \n" +
            "> **~BG** : te dit que tu est beau gosse \n"
        )
    } else if (mess.content.startsWith("~BLG")) {
        let response = ["de **Vénus**", "de **Jupiter**", "de la **Lune**"];

        let emojis = ["<:facial:994895288001110057>", "<:pussy:994892402718416936>", "<:ass:994892376575324160>"];

        let random = Math.floor(Math.random() * response.length);
        let random_2 = Math.floor(Math.random() * response.length);

        mess.channel.send(
            "D'après le calcul fait par les astres : __" + response[random] + "__ tu est Belle Gosse ! \n" +
            "\n" +
            emojis[random_2]
        )
    } else if (mess.content.startsWith("~BG")) {
        let response = ["de **Saturne**", "du **Soleil**", "de **Pluton**"];

        let emojis = ["<:facial:994895288001110057>", "<:pussy:994892402718416936>", "<:ass:994892376575324160>"];

        let random = Math.floor(Math.random() * response.length);
        let random_2 = Math.floor(Math.random() * response.length);

        mess.channel.send(
            "D'après le calcul fait par les astres : __" + response[random] + "__ tu est Beau Gosse ! \n" +
            "\n" +
            emojis[random_2]
        )
    }
})

bot.login(data.token)