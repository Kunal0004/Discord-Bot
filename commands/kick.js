const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: ['boot', 'Boot'],
    description: 'Kicks a user.',

    execute(client, prefix, message, args) {

        const filter = (reaction, user) => {
            return ['❗'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

       if (message.guild === null) return message.channel.send('This command is server only!')
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You are missing permission: `kick members`');
       if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Iam missing permission: `kick members`');

       if (message.mentions.members.first()){
        const memberToKick = message.mentions.members.first();

        if (!memberToKick.hasPermission('KICK_MEMBERS')) {
            let msg3;
            const embed = new Discord.MessageEmbed()
                .setTitle('Kick')
                .setDescription(`Are you sure you want to kick ${memberToKick}?\nReact with \`❗\` to confirm.`)
                .setColor('#7CFC00')
                .setFooter('You have 5 seconds to react.')

            message.channel.send(embed)
                .then(msg => {
                    msg3 = msg;
                    msg.react('❗')
                        .then(() => {
                            msg.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                                .then(collected => {

                                    msg.delete();

                                    memberToKick.kick()
                                        .then(() => {
                                            message.delete();

                                            const embed = new Discord.MessageEmbed()
                                                .setTitle(`✅ Kicked ${memberToKick.user.username}#${memberToKick.user.discriminator} successfully.`)
                                                .setColor('#7CFC00')
                                            
                                            message.channel.send(embed).then(msg2 => {
                                                msg2.delete({ timeout: 3000});
                                            }).catch(err => {
                                                console.error(err);
                                            });

                                        }).catch(err => {
                                            console.error(err);
                                            message.channel.send('Something went wrong.');
                                        })
                                }).catch(err => {

                                   message.channel.send('You didnt react in time.').then(msg2 => {
                                    
                                    msg2.delete({ timeout: 5000 });
                                    message.delete();
                                    msg3.delete();

                                   });
                                   console.error(err);

                                });
                        });
                });

        } else {

            return message.channel.send('Cannot kick mods/admins').then(msg => {

                message.delete();
                msg.delete({ timeout: 1000 });

            }).catch(err => console.log(err));

        };


        } else {

            return message.channel.send('Please mention a user to kick.')
        }

    }
};
