const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Gives information about commands.',
 
    execute(client, prefix, message, args) {
        let commandName;
        if (args[0]) {
            commandName = args.shift().toLowerCase();
        }

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        const defaultEmbed = new Discord.MessageEmbed()
            .setTitle(`Server: \`${message.channel.guild.name}\``)
            .setDescription(`Prefix: \`${prefix}\``)
            .setColor('#7CFC00')
            .setFooter(`Requested By ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
            .setTimestamp()
            .addFields(
                {name: 'Moderation:', value: '`Purge`, `Kick`, `Ban`'},
                {name: 'Utility:', value: '`Ping`'},
                {name: 'Misc:', value: '`8Ball`'}
            );

        if (!command || !commandName) return message.channel.send(defaultEmbed);

        try {
            const newEmbed = new Discord.MessageEmbed()
                .setTitle(`Help - ${command.name}`)
                .setDescription(command.description)
                .setColor('#7CFC00')
                .addField('Aliases', command.aliases.join(', ') || 'None')
                .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            return message.channel.send(newEmbed);
        } catch (err) {
            console.log(err)
        }
    }
};
