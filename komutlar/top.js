const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
module.exports.run = async(client, message, args) => {
        const CoinSıralama = db.all().filter(data => data.ID.startsWith(`Puan_`)).sort((a, b) => b.data - a.data)
        CoinSıralama.length = 5 
        let FinalDB = ""
        for (var i in CoinSıralama) {
          FinalDB += `**${CoinSıralama.indexOf(CoinSıralama[i])+1}** • ${client.users.cache.get(CoinSıralama[i].ID.slice(5)).tag}: **${CoinSıralama[i].data}** ${ayarlar.coinadıkisaltmasi}\n`
        }
        
        const Sıralama = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${ayarlar.coinadıkisaltmasi} Leaderboards`, message.guild.iconURL())
        .setDescription(FinalDB.replace(undefined,'Donny#0000') || 'Veri Yok.')
        .setFooter(`${client.guilds.cache.get(ayarlar.sunucuID).name}`,)
        .setTimestamp()
        message.replyNoMention(Sıralama)
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['top'],
    permLevel: 0
  }

  exports.help = {
    name: 'Sıralama',
    description: 'Coin Sıralaması.',
    usage: 'top'
  }