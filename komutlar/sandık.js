const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms");
const reply = require("discord-replys");
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message,args) => {
 const member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(message.author.id)
    let timeout = 86400000;
     
  let daily = db.fetch(`daily_${member.id}`);

  if(daily !== null && timeout - (Date.now() - daily) > 0){
      let time = ms(timeout - (Date.now() - daily));

message.reply(`Bu komutu kullanabilmek beklemen gereken süreyi \`/sandık\` komutu ile görebilirsin.`)
  } else {
     
    db.set(`daily_${member.id}`, Date.now());
function getRandomFloat(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
const Puan = getRandomFloat(400,1000)
db.add(`Puan_${member.id}`, Puan)
message.replyNoMention(`Günlük bakiyenizi topladınız ve **${Puan} ${ayarlar.coinadı}** kazandınız. Bu sandık ile **${db.fetch(`Puan_${member.id}`)} ${ayarlar.coinadı}** bakiyeye ulaştınız.`)
}
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['sandık'],
   permLevel: 0
}
  
exports.help = {
   name: 'Sandık',
   description: 'Sandık açarsınız',
   usage: 'sandık'
}