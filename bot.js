const Discord = require('discord.js');
const fs      = require('fs');
let { prefix, token } = require('./config.json');

if (!prefix) prefix = '-';
if (!token)  console.log('Please provide a token in config.json');

const client = new Discord.Client();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return console.log('oops, doesnt exist lol');

    try {
        command.execute(client, prefix, message, args);
    } catch (error) {
        console.log(error);
        message.reply('There was an error executing that command!')
    }
});


client.login(token);