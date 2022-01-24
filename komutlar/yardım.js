const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
require('moment-duration-format')

exports.run = async(client, message, args) => {
const db = client.db
const Choose = args[0]
const Yardım = new Discord.MessageEmbed()
.setColor('RED')
.setAuthor(client.user.username,client.user.avatarURL(),client.user.avatarURL({format: 'png', size: 4096}))
.setTitle(`${client.user.username} Yardım`)
.addField(`**\`${ayarlar.prefix}puan\`**`,'Puanınızı veya sunucu üyelerinin puanını görüntülersiniz.')
.addField(`**\`/sandık\`**(Slash komut)`,`${client.guilds.cache.get(ayarlar.sunucuID).name} sandığından size özel bir ödül çıkacak. Bakalım ne kadar şanslısınız?`)
.addField(`**\`${ayarlar.prefix}market\`**`,'Sunucuda kendinizi daha yukarıda gösterecek bir rolü kim istemez ki? Market komutu ile rolünüzü alabilirsiniz.')
.addField(`**\`${ayarlar.prefix}top\`**`,`${ayarlar.coinadı} sıralamasını gösterir. Rekabete hazır mısın?`)
.addField(`**\`${ayarlar.prefix}profil\`**`,'Profilinizi veya sunucu üyelerinin profillerini görüntülersiniz.')
.addField(`**\`${ayarlar.prefix}hakkımda\`**`,'Profil komutunuzdaki hakkımda kısmını bu komut ile değiştirebilirsiniz.')
message.channel.send(Yardım)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yardım','help'],
  permLevel: 0
}

exports.help = {
  name: 'Yardım | Help',
  description: 'Yardım Menüsünü Gösterir',
  usage: 'yardım'
}