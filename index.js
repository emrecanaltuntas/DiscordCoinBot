const Discord = require('discord.js')
const client = new Discord.Client({ mentionsMember: true})
const fs = require('fs')
const ms = require('parse-ms')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const buttons = require('discord-buttons')
buttons(client)
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
require('./util/eventLoader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./komutlar/', (Error, Files) => {
    if (Error) console.error(Error)
    console.log(`${Files.length} Komut Yüklenecek!`)
    Files.forEach(Pepe => {
        let Props = require(`./komutlar/${Pepe}`)
        console.log(`Yüklenen Komut: ${Props.help.name}.`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.reload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 client.commands.set(command, CMD)
 CMD.conf.aliases.forEach(Alias => {
 client.aliases.set(Alias, CMD.help.name)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.load = command => {
 return new Promise((Resolve, Reject) => {
 try {
 let CMD = require(`./komutlar/${command}`)
client.commands.set(command, CMD)
CMD.conf.aliases.forEach(Alias => {
client.aliases.set(Alias, CMD.help.name)
})
Resolve()
} catch (Hata) {
Reject(Hata)
}})}

client.unload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.elevation = message => {
    if (!message.guild) {
        return
    }
    let permlvl = 0
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl
}

function getRandomFloat(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

client.on('message', async message => {
if (message.author.bot) return
if (message.content.length < 5) return
if (message.channel.id != ayarlar.sohbetkanalı) return
const Olasilik = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
const Olasilikk = Olasilik[Math.floor(Math.random() * Olasilik.length)]
if(Olasilikk == true) {
const KacanPuanlar = [`Olamaz! Bu da ne! Hemen birisi şu kaçan puanlarımı yakalasın! Tam **{{coin}}** puanım elimden kaydı!`,`Ceon'un bilgisayarında **{{coin}}** ${ayarlar.coinadıkısaltması} coin gözüktü, onu ilk kapan olmak için butona **tıkla**!`]
const PuanButon = KacanPuanlar[Math.floor(Math.random() * KacanPuanlar.length)]
const randomNumber = getRandomFloat(400, 851)
const button = new buttons.MessageButton() 
.setID(`puanDüstü.${randomNumber}`)
.setLabel('Tıkla')
.setStyle('blurple')
message.channel.send(PuanButon.replace(/{{coin}}/g, randomNumber),{ buttons: [button] }) 
} else {
return
}
})

client.on('clickButton', async button => {
if (button.id.startsWith('puanDüstü')) {
button.reply.send(`Tebrikler <@${button.clicker.id}>! **${button.id.split('.')[1]}** puan kazandınız.`)
button.message.delete()
db.add(`Puan_${button.clicker.id}`,button.id.split('.')[1])
}
})

client.on('message', async message => {
if (message.author.bot) return
if (message.guild.id != ayarlar.sunucuID)
db.add(`Puan_${message.author.id}`,1)
}) 

client.on('ready', () => { 
client.api.applications(client.user.id).guilds(ayarlar.sunucuID).commands.post({
    data: {
      name: "sandık",
      description: "Günlük puanınızı almanızı sağlar.",
      }
});
});

client.ws.on('INTERACTION_CREATE', async interaction => {
 const command = interaction.data.name
 const args = interaction.data.options;
 let member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(interaction.member.user.id)
if(command === "sandık") {
    let timeout = 86400000;


     
  let daily = db.fetch(`daily_${member.id}`);

  if(daily !== null && timeout - (Date.now() - daily) > 0){
      let time = ms(timeout - (Date.now() - daily));
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: `Bu komutu kullanabilmek için **${time.hours} saat, ${time.minutes} dakika** daha beklemen gerekiyor.`,
                flags: "64" // Gizli reply atmak için girmeniz gereken flag
            }
          }  
      })
      return;
  } else {
     
    db.set(`daily_${member.id}`, Date.now());
function getRandomFloat(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
const Puan = getRandomFloat(400,1000)
db.add(`Puan_${member.id}`, Puan)

  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
        type: 4,
        data: {
            content: `Günlük bakiyenizi topladınız ve **${Puan} ${ayarlar.coinadı}** kazandınız. Bu sandık ile **${db.fetch(`Puan_${member.id}`)} ${ayarlar.coinadı}** bakiyeye ulaştınız.`,
        }
      }  
  })
  }


}        
     });   

client.login(ayarlar.token)
