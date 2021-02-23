const Discord = require('discord.js');

const questions = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."]

module.exports = {
    name: '8ball',
    aliases: ['luck', 'pick', 'choose'],
    description: 'Awnsers your question',

    execute(client, prefix, message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("`🎱` 8Ball")
            .addFields({
                name: `${message.author.username}'s Question:`,
                value: args.join(' ')}, {
                name: `Answer:`,
                value: questions[Math.floor(Math.random()*questions.length)]
            })
            .setColor("#7CFC00")
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(embed)
    }
};
