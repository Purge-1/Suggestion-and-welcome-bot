const chalk = require("chalk")
console.log(chalk.bold.green("[INFO]:") + " index.js Script Running...")
const Client = require("./Structures/DevClient.js");
const { prefix, token } = require("./config.json")
const Discord = require("discord.js")
const client = new Client({
    disableEveryone: true
})

//loading the commands:
client.loadCommands(client)

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
})

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) {
        return message.channel.send(":x: | Command Not Found")
    }
  if (command.devsOnly === true && !client.devs.includes(message.author.id)) {
          return message.channel.send(":x: | Owner Only Command.")
  } 

  if (command) {
    try {
    command.run(client, message, args);
    } catch (err) {
        message.channel.send("There was an error trying to execute that command, try again later.")
        return client.error("ERROR", err)
    }
}   
});

client.on("guildMemberAdd", async (member) => {
 if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
        if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
        let canvass = require("discord-canvas")
        let Welcomed = new canvass.Welcome();
        
        let Image = await Welcomed
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
        .setMemberCount(member.guild.memberCount)
        .setBackground("https://media.discordapp.net/attachments/804579499697635340/805748604940976148/image0.jpg")
        .toAttachment();
                
        let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
        let channel =  client.channels.cache.get("784696024752586772")
channel.send("<@"+ member.user.id + ">", {
    files: [
        Attachment
    ]
}) 
})

client.on("guildMemberRemove", async (member) => {
    if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
           if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
           let canvass = require("discord-canvas")
           let Welcomed = new canvass.Goodbye();
           
           let Image = await Welcomed
           .setUsername(member.user.username)
           .setDiscriminator(member.user.discriminator)
           .setGuildName(member.guild.name)
           .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
           .setMemberCount(member.guild.memberCount)
           .setBackground("https://media.discordapp.net/attachments/804579499697635340/805748604940976148/image0.jpg")
           .toAttachment();
                   
           let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
           let channel =  client.channels.cache.get("784696024752586772")
   channel.send({
       files: [
           Attachment
       ]
   }) 
   })

client.start(token);