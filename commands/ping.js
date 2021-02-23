const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['ping1', 'ping2'],
    description: 'replies with bots latency.',

    execute(client, prefix, message, args) {

        const embed = new Discord.MessageEmbed()
            .setTitle('🏓 Pong!')
            .setDescription(`Discord Api: ${Math.round(client.ws.ping)}ms\nMy ping: ${Date.now() - message.createdTimestamp}ms`)
            .setColor('#7CFC00')
            .setFooter(`Requested By ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
            .setTimestamp()

        return message.channel.send('Calculating...').then(msg => {
            msg.delete();
            message.channel.send(embed)
        }).catch(err => {
            message.channel.send('Something went wrong!')
            console.error(err);
        })
    }
};