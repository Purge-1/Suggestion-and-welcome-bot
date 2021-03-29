const Discord = require("discord.js"),
      { post } = require("node-superfetch");

module.exports = {
  name: "eval",
aliases: ["ev"],
  category: "owner",
  devsOnly: true,
  run: async (client, message, args) => {
  // This command is super frickin' dangerous. Make it only visible and usable for you only, or give it to someone you trust
    const eembed = new Discord.MessageEmbed()
            .setTitle('Evaluating...')
    .setColor(`GREEN`)
        const msg = await message.channel.send({
                embed: eembed
            });
  
  const embed = new Discord.MessageEmbed()
  .addField("📥 Input", "```js\n" + args.join(" ") + "```");
  
  try {
   const error = new Discord.MessageEmbed()
   .setTitle("Provide a Code to eval!")
   .setColor("#FF0000")
    let code = args.join(" ");
    if (!code) return msg.edit({
        embed: error
    });
    let evaled;
 
    
    
    // This method is to prevent someone that you trust, open the secret shit here.
    if (code.toLowerCase().includes(`process.exit()`) || code.toLowerCase().includes(`client["token"]`) || code.toLowerCase().includes("config.token")) {
    const ad = new Discord.MessageEmbed()
    .setTitle("Access Denied")
    .setDescription("The access was denied")
    .setThumbnail(message.author.displayAvatarURL({
    dynamic: true
    }))
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL({
    dynamic: true
    }))
      return msg.edit({
         embed: ad
      })
    }
    
    
    
    
    
   if (message.content.toLowerCase().endsWith("//async") || message.content.toLowerCase().endsWith("//a")) {
    code = `(async () => {
    ${args.join(" ")}
    }
    )()`
    }
    
    evaled = await eval(code);
if (message.content.toLowerCase().endsWith("//raw") || message.content.toLowerCase().endsWith("//r")) {
    return message.channel.send("```" + "\n" + evaled + "\n" + "```")
 .then(bruh=> {
 msg.delete()
 })
    }
let type = typeof evaled;
   if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
   
    let output = clean(evaled)
    if (output.length > 1024) {
      // If the output was more than 1024 characters, we're gonna export them into the hastebin.
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
      // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
    } else {
      embed.addField("📤 output", "```js\n" + output + "```").setColor(0x7289DA)
  }
                            
     embed.addField("Type", "```js\n" + type + "```")
                      
await msg.edit({
    embed: embed
})
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })

                })                  
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      // Do the same like above if the error output was more than 1024 characters.
      const {body} = await post("https://.com/documents").send(err);
      embed.addField("📤 output", `https://hastebin.com/${body.key}.js`).setColor("RED");
    } else {
      embed.addField("📤 output", "```js\n" + err + "```").setColor("#FF0000");
    }
    
    msg.edit({
        embed: embed
    });
    
                        
                    
  }
}
          
               
}
  function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }}
