const Discord = require("discord.js")
module.exports = {
  name: "request",
  run: async (client, message, args) => {
    const channel = client.channels.cache.get("805858311400062996")
    let sug = args.slice(0).join(" ")

if (!sug) {
message.channel.send(":x: | **Provide Your Request**")
}
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
    .addField(`Suggestion`, sug)
    .addField(`Status`, "Pending")
    .setColor("RANDOM")
  const msg = await channel.send({
      embed: embed
  })
  msg.react("✅")
    msg.react("❌")
    message.channel.send("Your Request has been sent")
  }
}