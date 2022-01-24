const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
const user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author
const puan = db.fetch(`Puan_${user.id}` || 0)
message.replyNoMention(`${user.tag || `Donny#0000`} adlı üyenin bakiyesi **${puan || `0`} ${ayarlar.coinadıkisaltmasi}**.`)
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['puan','coin'],
   permLevel: 0
}
  
exports.help = {
   name: 'Coin',
   description: 'Coine bakarsın',
   usage: 'coin'
}