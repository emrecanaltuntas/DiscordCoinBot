module.exports = (client) => {

//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında

    client.user.setActivity(`${client.user.username}`,{ type: 'WATCHING'} )
    console.log(`${client.user.username} Aktif!`)
}