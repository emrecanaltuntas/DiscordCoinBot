const Discord = require("discord.js")
const db = require("quick.db") 
const reply = require("discord-replys");

exports.run = async (client, message, args) => {
  if(!args[0]) {
return message.replyNoMention(`Hakkımda kısmını ayarlamak için bir argüman girmelisin.`) 
} 
db.set(`hakkimda_${message.author.id}`, args.slice(0).join(` `))
const hakkimda = db.fetch(`hakkimda_${message.author.id}`)
return message.replyNoMention(`Hakkımda kısmınız başarıyla değiştirildi, yeni hakkımda mesajınız;
\`\`\`
${hakkimda}
\`\`\``)};

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['hakkımda'],
   permLevel: 0
}
  
exports.help = {
   name: 'Hakkımda',
   description: 'Coine bakarsın',
   usage: 'hakkımda'
} 