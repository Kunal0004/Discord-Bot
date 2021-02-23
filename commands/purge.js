module.exports = {
    name: 'purge',
    aliases: [],
    description: 'Bulk Delete Messages.',

    execute(client, prefix, message, args) { 
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You are missing permission: `Manage_Messages`');
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Iam missing permission: `Manage_Messages`');

        if (args.length > 0 && args[0] > 1 && args[0] < 100) {

            message.channel.bulkDelete(parseInt(args[0])+1).then(() => {
                message.channel.send(`♻ Purged ${args[0]} messages!`).then(msg => {
                    msg.delete({ timeout: 100 });
                
                }).catch(err => {

                    console.log(err);
                });
                

            }).catch(err => {

                console.log(err)
                message.channel.send('Something went wrong!')

            });

        } else {
            return message.channel.send(`Please give a valid amount to delete(under 100 and over 1), \`${prefix}purge [amount]\``).then(msg => {msg.delete({ timeout: 100 }); message.delete({ timeout: 100} )});
        };
    }
}