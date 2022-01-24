const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const reply = require("discord-replys");
exports.run = async (client, message, args) => {


const user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author
const hakkimda = db.fetch(`hakkimda_${user.id}`)
const puan = db.fetch(`Puan_${user.id}` || 0)
const rozetlerkisi = user.flags.toArray().join("\n")
    ? user.flags
        .toArray()
        .join(" ")
        .replace("DISCORD_EMPLOYEE", "<:personal:927176816748273715> ")
        .replace("CERTIFIED_MODERATOR", "<:discordmoderator:927176640604299334> ")
        .replace("DISCORD_PARTNER", "<:partner:924747480074190919> ")
        .replace("BUGHUNTER_LEVEL_2", "<:bug2:927176639220154400> ")
        .replace("BUGHUNTER_LEVEL_1", "<:bug1:927176638024785970> ")
        .replace("HYPESQUAD_EVENTS", "<:hypesquad:927176642630139924> ")
        .replace("EARLY_SUPPORTER", "<:earlysupporter:927176641514446880> ")
        .replace("VERIFIED_DEVELOPER", "<:verified:927176913804468265> ")
        .replace("VERIFIED_BOT", ":verifiedbot:767333886136811540> ")
        .replace("HOUSE_BRAVERY", "<:hype1:927176811643830292> ")
        .replace("HOUSE_BRILLIANCE", "<:hype3:927176814990852107> ")
        .replace("HOUSE_BALANCE", "<:hype2:927176813636091917> ")
    : `Hiç rozeti yok.`;
message.replyNoMention(`
**${user.tag}**
Profil aşağıda gösterilmektedir:

:white_small_square: __**ID:**__ ${user.id}
:white_small_square: __**Discord Rozetleri:**__ ${rozetlerkisi}
:white_small_square: __**${ayarlar.coinadı} :**__ ${puan || 0} ${ayarlar.coinadıkisaltmasi}
:white_small_square: __**${ayarlar.coinadı} Sıralaması:**__ _Gelecek_
:white_small_square: __**Hakkımda:**__ \`\`\`
${hakkimda || `${ayarlar.prefix}hakkımda komutu ile hakkımda kısmını düzenleyebilirsiniz.`}
\`\`\`
`)
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['profil'],
   permLevel: 0
}
  
exports.help = {
   name: 'Profil',
   description: 'Sandık açarsınız',
   usage: 'sandık'
}