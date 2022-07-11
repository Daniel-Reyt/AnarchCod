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
            "> **~BG** : te dit que tu est beau gosse \n" +
            "> **~Event** : permet d'envoyer un message d'event avec en paramêtre le type d'event, la description et la récompense (optionnel), les params doivent être séparés par des **/** pour fonctionner \n"+
            "> **~deleteVoiceEvent** : commande permettant de supprimer le channel vocal d'Event **(bientot automatisé)** \n"
        )
    } else if (mess.content.startsWith("~BLG")) {
        let response = ["de **Vénus**", "de **Jupiter**", "de la **Lune**","de **Eris**","de **Sedna**","de **Haumea**","de **Dysnomia","de **Varuna**","de **Salcia**","de **Namaka**"];

        let emojis = ["<:facial:994895288001110057>", "<:pussy:994892402718416936>", "<:ass:994892376575324160>"];

        let random = Math.floor(Math.random() * response.length);
        let random_2 = Math.floor(Math.random() * response.length);

        mess.channel.send(
            "D'après le calcul fait par les astres : __" + response[random] + "__ tu est Belle Gosse ! \n" +
            "\n" +
            emojis[random_2]
        )
    } else if (mess.content.startsWith("~BG")) {
        let response = ["de **Saturne**", "du **Soleil**", "de **Pluton**","de **Orcs**","de **Charon**","de **Vanth**","de **Weywot**","de **Actea**","de **Kerberos**","de **Quaroar**"];

        let emojis = ["<:facial:994895288001110057>", "<:pussy:994892402718416936>", "<:ass:994892376575324160>"];

        let random = Math.floor(Math.random() * response.length);
        let random_2 = Math.floor(Math.random() * response.length);

        mess.channel.send(
            "D'après le calcul fait par les astres : __" + response[random] + "__ tu est Beau Gosse ! \n" +
            "\n" +
            emojis[random_2]
        )
    } else if (mess.content.startsWith("~Event")) {
        let type_event = mess.content.split(" ")[1]
        let text_event = mess.content.split("/")[1]
        let winprize_event = mess.content.split("/")[3]
        let duration_event = mess.content.split("/")[2]

        if (winprize_event != undefined && winprize_event != null && winprize_event != "") {
            bot.channels.cache.get(`994888269244416062`).send(
                "||@everyone|| \n"+
                "\n"+
                "> Nouvel Event : \n"+
                "> Type d'event : " + type_event + " \n"+
                "> Description de l'event : " + text_event + " \n"+
                "> Récompense de l'event : " + winprize_event + " \n"+ 
                "> Durée de l'event : " + duration_event + " heures"
            ).then(function (message) {
                message.react("👍");
                message.react("👎");
            })
            mess.guild.channel.create('𝔼𝕧𝕖𝕟𝕥', {
                type: "GUILD_VOICE"
            }).then(channel => {
                const category_ID = "995937413299961926"
                channel.setParent(category_ID)
                let channel_createDate = new Date(channel.createdTimestamp);

                setInterval(() => {
                    let date = new Date();
                    var diff =(date.getTime() - channel_createDate.getTime()) / 1000;
                    console.log("diff", Math.round(diff))
                    if (Math.round(diff) == ((duration_event*60)*60)) {
                        const fetchedChannel = mess.guild.channels.find(r => r.name === '𝔼𝕧𝕖𝕟𝕥' && r.type === "GUILD_VOICE");
                        fetchedChannel.delete();
                    }
                }, 1000)
            })
        } else {
            bot.channels.cache.get(`994888269244416062`).send(
                "||@everyone|| \n"+
                "\n"+
                "> Nouvel Event : \n"+
                "> Type d'event : " + type_event + " \n"+
                "> description de l'event : " + text_event + " \n"+
                "> Durée de l'event : " + duration_event + " heures"
            ).then(function (message) {
                message.react("👍");
                message.react("👎");
            });
            mess.guild.channels.create('𝔼𝕧𝕖𝕟𝕥', {
                type: "GUILD_VOICE"
            }).then(channel => {
                const category_ID = "995937413299961926"
                channel.setParent(category_ID)
                let channel_createDate = new Date(channel.createdTimestamp);

                let intervalId = setInterval(() => {
                    let date = new Date();
                    var diff =(date.getTime() - channel_createDate.getTime()) / 1000;
                    console.log("diff", Math.round(diff))
                    if (Math.round(diff) == ((duration_event*60)*60)) {
                        const fetchedChannel = bot.channels.cache.get(channel.id)
                        fetchedChannel.delete();
                        clearInterval(intervalId)
                    }
                }, 1000)
            })            
        }
    }
})

bot.login("OTk1MzE0MDQxNDQ0NjQyOTM4.GnXk5f.9WiuWre_oV1uAjDPbpMm4P8oHJiDEvJsZoQsm8")
