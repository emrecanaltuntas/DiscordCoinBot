const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
if(!ayarlar.sahip.includes(message.author.id)) return message.reply(new Discord.MessageEmbed().setDescription('Sen sahibim değilsin!')).then(Hata => Hata.delete({timeout:15000}))

if (args[0] == 'coinekle') {
const Üye = message.mentions.users.first() || client.users.cache.get(args[1])
if (!Üye) return message.reply('Bir üye etiketleyin.')
const Miktar = args[1]
if (isNaN(args[1])) return message.reply('Lütfen miktar yazın!')
message.reply(`İşlem tamamlandı!`)
db.add(`Puan_${Üye.id}`,Miktar)
} else {
if (args[0] == 'coinsil') {
  const Üye = message.mentions.users.first() || client.users.cache.get(args[1])
  if (!Üye) return message.reply('Bir üye etiketleyin.')
  const Miktar = args[1]
  if (isNaN(args[1])) return message.reply('Lütfen miktar yazın!')
message.reply(`İşlem tamamlandı!`)
  db.add(`Puan_${Üye.id}`,-Miktar)
} else {
if (args[0] == 'hakkımdasil') {
  const Üye = message.mentions.users.first() || client.users.cache.get(args[1])
  if (!Üye) return message.reply('Bir üye etiketleyin.')
message.reply(`İşlem tamamlandı!`)
  db.delete(`hakkimda_${Üye.id}`)
} else return message.reply('Seçenek girin. `coinekle` | `coinsil` | `hakkımdasil`')
}
} 
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['veri'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Coin Verme-Silme | Hakkımda Silme',
    description: 'Üyeden Coin Siler - Ekler.',
    usage: 'c'
  }
