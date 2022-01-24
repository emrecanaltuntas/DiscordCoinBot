const disbut = require('discord-buttons')
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
const reply = require("discord-replys");
const { MessageButton, MessageActionRow } = require('discord-buttons')
exports.run = async (client, message, args) => {
  const ilksırabuttons = []
  const ilksıraarray = [{label: "1", id: "bir"}, {label: "2", id: "iki"}, {label: "3", id: "üç"}]
  const ikincisırabuttons = []
  const ikincisıraarray = [{label: "4", id: "dört"}, { label: "5", id: "beş"}, {label: "X", id: "altı"}]
  const rol1 = ayarlar.rol1ID
  const rol1price = 700000
  const rol2 = ayarlar.rol2ID
  const rol2price = 450000
  const rol3 = ayarlar.rol3ID
  const rol3price = 200000
  const rol4 = ayarlar.rol4ID
  const rol4price = 125000
  const rol5 = ayarlar.rol5ID
  const rol5price = 50000
const Puan = db.fetch(`Puan_${message.author.id}`) || 0
let color;
let disabled;
ilksıraarray.forEach(element => {
if (element.id == 'bir' && Puan > rol1price) color = "green",message.member.roles.cache.has(rol1) ? disabled = true : disabled = false
if (element.id == 'bir' && Puan < rol1price) color = "gray",message.member.roles.cache.has(rol1) ? disabled = true : disabled = false
if (element.id == 'iki' && Puan > rol2price) color = "green",message.member.roles.cache.has(rol2) ? disabled = true : disabled = false
if (element.id == 'iki' && Puan < rol2price) color = "gray",message.member.roles.cache.has(rol2) ? disabled = true : disabled = false
if (element.id == 'üç' && Puan > rol3price) color = "green",message.member.roles.cache.has(rol3) ? disabled = true : disabled = false
if (element.id == 'üç' && Puan < rol3price) color = "gray",message.member.roles.cache.has(rol3) ? disabled = true : disabled = false

const buton = new MessageButton()
.setStyle(color)
.setLabel(element.label)
.setID(element.id)
.setDisabled(disabled)
ilksırabuttons.push(buton)
})
  
ikincisıraarray.forEach(element => {
if (element.id == 'dört' && Puan > 125000) color = "green",message.member.roles.cache.has(rol4) ? disabled = true : disabled = false
if (element.id == 'dör' && Puan < 125000) color = "gray",message.member.roles.cache.has(rol4) ? disabled = true : disabled = false
if (element.id == 'beş' && Puan > 50000) color = "green",message.member.roles.cache.has(rol5) ? disabled = true : disabled = false
if (element.id == 'beş' && Puan < 50000) color = "gray",message.member.roles.cache.has(rol5) ? disabled = true : disabled = false
if (element.id == 'altı') color = "red", message.member.id != "927627615295115344" ? disabled = false : disabled = false

const buton = new MessageButton()
.setStyle(color)
.setLabel(element.label)
.setID(element.id)
.setDisabled(disabled)
ikincisırabuttons.push(buton)
}) 
const ilkrow = new MessageActionRow()
.addComponents(ilksırabuttons)
  
const ikincirow = new MessageActionRow()
.addComponents(ikincisırabuttons)

message.channel.send(`<@${message.author.id}>, market aşağıda gösterilmektedir:
__**Puanınız: ${Puan}**__

**1)** ${message.guild.roles.cache.get(rol1).name}: ${rol1price.toLocaleString()} Puan
**2)** ${message.guild.roles.cache.get(rol2).name}: ${rol2price.toLocaleString()} Puan
**3)** ${message.guild.roles.cache.get(rol3).name}: ${rol3price.toLocaleString()} Puan
**4)** ${message.guild.roles.cache.get(rol4).name}: ${rol4price.toLocaleString()} Puan
**5)** ${message.guild.roles.cache.get(rol5).name}: ${rol5price.toLocaleString()} Puan

**Bakiyenizle satın alabilecekleriniz yeşil, satın alamayacaklarınız gri renkte gösterilmektedir.**`,{ components: [ ilkrow, ikincirow ] }).then(async function (mesaj) {
mesaj.createButtonCollector(user => user).on('collect', async (button) => {
if (button.clicker.id !== message.author.id) return client.api.interactions(button.discordID, button.token).callback.post({
  data: {
  type: 4,
  data: {
    content: `🤨 Menüyü kullanabilmek için komutu siz yazmış olmalısınız.`,
    flags: "64"
  }
  }
})
  
if (button.id == 'bir') {
if (Puan < rol1price) return client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
        content: `🤨 Yeterli puana sahip değilsiniz.`,
        flags: "64"
      }
      }
    })

    client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
      content: `😊 Başarıyla "**${message.guild.roles.cache.get(rol1).name}**" rolünü size verdim ve hesabınızdan **${rol1price.toLocaleString()}** Puan sildim.`,
      flags: "64"
      }
      }
    })
    message.member.roles.add(rol1)
    db.add(`Puan_${button.clicker.id}`,-rol1price)
    mesaj.edit(`<@${button.clicker.id}>, market aşağıda gösterilmektedir:
__**Puanınız: ${db.fetch(`Puan_${message.author.id}`) || 0}**__

**1)** ${message.guild.roles.cache.get(rol1).name}: ${rol1price.toLocaleString()} Puan
**2)** ${message.guild.roles.cache.get(rol2).name}: ${rol2price.toLocaleString()} Puan
**3)** ${message.guild.roles.cache.get(rol3).name}: ${rol3price.toLocaleString()} Puan
**4)** ${message.guild.roles.cache.get(rol4).name}: ${rol4price.toLocaleString()} Puan
**5)** ${message.guild.roles.cache.get(rol5).name}: ${rol5price.toLocaleString()} Puan
    
**Bakiyenizle satın alabilecekleriniz yeşil, satın alamayacaklarınız gri renkte gösterilmektedir.**

> <@${button.clicker.id}>, **${rol1price.toLocaleString()}** Puan karşılığında "${message.guild.roles.cache.get(rol1).name}" rolünü satın aldı.`,{ components: [] })
  } else if (button.id == 'iki') {
  if (Puan < rol2price) return client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
        content: `🤨 Yeterli puana sahip değilsiniz.`,
        flags: "64"
      }
      }
    })

    client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
      content: `😊 Başarıyla "**${message.guild.roles.cache.get(rol2).name}**" rolünü size verdim ve hesabınızdan **${rol2price.toLocaleString()}** Puan sildim.`,
      flags: "64"
      }
      }
    })
    message.member.roles.add(rol2)
    db.add(`Puan_${button.clicker.id}`,-rol2price)
    mesaj.edit(`<@${button.clicker.id}>, market aşağıda gösterilmektedir:
__**Puanınız: ${db.fetch(`Puan_${message.author.id}`) || 0}**__

**1)** ${message.guild.roles.cache.get(rol1).name}: ${rol1price.toLocaleString()} Puan
**2)** ${message.guild.roles.cache.get(rol2).name}: ${rol2price.toLocaleString()} Puan
**3)** ${message.guild.roles.cache.get(rol3).name}: ${rol3price.toLocaleString()} Puan
**4)** ${message.guild.roles.cache.get(rol4).name}: ${rol4price.toLocaleString()} Puan
**5)** ${message.guild.roles.cache.get(rol5).name}: ${rol5price.toLocaleString()} Puan
    
**Bakiyenizle satın alabilecekleriniz yeşil, satın alamayacaklarınız gri renkte gösterilmektedir.**

> <@${button.clicker.id}>, **${rol2price.toLocaleString()}** Puan karşılığında "${message.guild.roles.cache.get(rol2).name}" rolünü satın aldı.`,{ components: [] })
  } else if (button.id == 'üç') {
  if (Puan < rol3price) return client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
        content: `🤨 Yeterli puana sahip değilsiniz.`,
        flags: "64"
      }
      }
    })

    client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
      content: `😊 Başarıyla "**${message.guild.roles.cache.get(rol3).name}**" rolünü size verdim ve hesabınızdan **${rol3price.toLocaleString()}** Puan sildim.`,
      flags: "64"
      }
      }
    })
    message.member.roles.add(rol3)
    db.add(`Puan_${button.clicker.id}`,-rol3price)
    mesaj.edit(`<@${button.clicker.id}>, market aşağıda gösterilmektedir:
__**Puanınız: ${db.fetch(`Puan_{message.author.id}`) || 0}**__

**1)** ${message.guild.roles.cache.get(rol1).name}: ${rol1price.toLocaleString()} Puan
**2)** ${message.guild.roles.cache.get(rol2).name}: ${rol2price.toLocaleString()} Puan
**3)** ${message.guild.roles.cache.get(rol3).name}: ${rol3price.toLocaleString()} Puan
**4)** ${message.guild.roles.cache.get(rol4).name}: ${rol4price.toLocaleString()} Puan
**5)** ${message.guild.roles.cache.get(rol5).name}: ${rol5price.toLocaleString()} Puan
    
**Bakiyenizle satın alabilecekleriniz yeşil, satın alamayacaklarınız gri renkte gösterilmektedir.**

> <@${button.clicker.id}>, **${rol3price.toLocaleString()}** Puan karşılığında "${message.guild.roles.cache.get(rol3).name}" rolünü satın aldı.`,{ components: [] })
  } else if (button.id == 'dört') {
  if (Puan < rol4price) return client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
        content: `🤨 Yeterli puana sahip değilsiniz.`,
        flags: "64"
      }
      }
    })

    client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
      content: `😊 Başarıyla "**${message.guild.roles.cache.get(rol4).name}**" rolünü size verdim ve hesabınızdan **${rol4price.toLocaleString()}** Puan sildim.`,
      flags: "64"
      }
      }
    })
    message.member.roles.add(rol4)
    db.add(`Puan_${button.clicker.id}`,-rol4price)
    mesaj.edit(`<@${button.clicker.id}>, market aşağıda gösterilmektedir:
__**Puanınız: ${db.fetch(`Puan_${message.author.id}`) || 0}**__

**1)** ${message.guild.roles.cache.get(rol1).name}: ${rol1price.toLocaleString()} Puan
**2)** ${message.guild.roles.cache.get(rol2).name}: ${rol2price.toLocaleString()} Puan
**3)** ${message.guild.roles.cache.get(rol3).name}: ${rol3price.toLocaleString()} Puan
**4)** ${message.guild.roles.cache.get(rol4).name}: ${rol4price.toLocaleString()} Puan
**5)** ${message.guild.roles.cache.get(rol5).name}: ${rol5price.toLocaleString()} Puan
    
**Bakiyenizle satın alabilecekleriniz yeşil, satın alamayacaklarınız gri renkte gösterilmektedir.**

> <@${button.clicker.id}>, **${rol4price.toLocaleString()}** Puan karşılığında "${message.guild.roles.cache.get(rol4).name}" rolünü satın aldı.`,{ components: [] })
  } else if (button.id == 'beş') {
  if (Puan < rol5price) return client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
        content: `🤨 Yeterli puana sahip değilsiniz.`,
        flags: "64"
      }
      }
    })

    client.api.interactions(button.discordID, button.token).callback.post({
      data: {
      type: 4,
      data: {
      content: `😊 Başarıyla "**${message.guild.roles.cache.get(rol5).name}**" rolünü size verdim ve hesabınızdan **${rol5price.toLocaleString()}** Puan sildim.`,
      flags: "64"
      }
      }
    })
    message.member.roles.add(rol5)
    db.add(`Puan_${button.clicker.id}`,-rol5price)
    mesaj.edit(`<@${button.clicker.id}>, market aşağıda gösterilmektedir:
__**Puanınız: ${db.fetch(`Puan_${message.author.id}`) || 0}**__

**1)** ${message.guild.roles.cache.get(rol1).name}: ${rol1price.toLocaleString()} Puan
**2)** ${message.guild.roles.cache.get(rol2).name}: ${rol2price.toLocaleString()} Puan
**3)** ${message.guild.roles.cache.get(rol3).name}: ${rol3price.toLocaleString()} Puan
**4)** ${message.guild.roles.cache.get(rol4).name}: ${rol4price.toLocaleString()} Puan
**5)** ${message.guild.roles.cache.get(rol5).name}: ${rol5price.toLocaleString()} Puan
    
**Bakiyenizle satın alabilecekleriniz yeşil, satın alamayacaklarınız gri renkte gösterilmektedir.**

> <@${button.clicker.id}>, **${rol5price.toLocaleString()}** Puan karşılığında "${message.guild.roles.cache.get(rol5).name}" rolünü satın aldı.`,{ components: [] })
  } else if (button.id == 'altı') {
  mesaj.delete()
  }
  })
})
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['market'],
   permLevel: 0,
   category: 'User'
}
  
exports.help = {
   name: 'Market',
   description: 'Get guild info | Sunucu hakkında bilgi al',
   usage: 'sunucubilgi'
}