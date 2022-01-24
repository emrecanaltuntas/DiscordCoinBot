const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
exports.run = async (client, message, args) => {

  if (!ayarlar.sahip.includes(message.author.id)) return
  try {
    let codein = args.join(" ")
    let code = eval(codein)
    if (codein.length < 1) return message.channel.send('Lütfen bir kod gir.')
    if (codein == 'client.token') return message.channel.send('Invalid argumants.')
    if (typeof code !== 'string')    
    code = require('util').inspect(code, { depth: 0 })
    const Embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .addField('📤 Giriş', `\`\`\`js\n${codein}\`\`\``)
    .addField('📥 Çıkış', `\`\`\`js\n${code}\n\`\`\``)
    message.channel.send(Embed)
  } catch(Hata) {
    const Embed2 = new Discord.MessageEmbed()
    .setColor('RED')
    .addField('❌ Hata', `\`\`\`js\n${Hata}\n\`\`\``)
    message.channel.send(Embed2)
  }
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['eval'],
   permLevel: 0
}
  
exports.help = {
   name: 'Eval',
   description: 'Test your code',
   usage: 'eval'
}
