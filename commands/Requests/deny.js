const Discord = require("discord.js")
module.exports = {
  name: "deny",
  run: async (client, message, args) => {
    if (message.member.guild.id !== "797037790205444105") {
        return message.channel.send("This command is for RubyTopia.")
    }
    const channel = client.channels.cache.get("805858311400062996")
    if (!message.member.roles.cach.has("804775362604302416")){
        return message.channel.send(":x: | You do not have the developer role.")
    }
    try {
        await channel.messages.fetch(args[0])
} catch (err) {
    return message.channel.send(":x: | **There was an error Trying to execute that command**")
}
const msg = await channel.messages.fetch(args[0])
    if (!msg) {
    message.channel.send("Request Not Found!")
    }
    let note = args.slice(1).join(" ")
    if (!note) {
      note = "Not Provided"
    }
    let member = client.users.cache.find(m=> m.tag === msg.embeds[0].author.name)
    if (!member) {
        message.channel.send("The User Who Requested That Was Not Found, maybe they left?")
    }
    if (member) {
        member.send("Your Request Was Denied By " + message.author.tag + " With The Reason: " + note)
    }
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
    .addField(`Suggestion`, msg.embeds[0].fields[0].value)
    .addField(`Status`, "Denied")
    .addField("Denied By", message.author.tag)
    .addField(`Reason`, note)
    .setColor("#FF0000")
 msg.edit({
     embed: embed
 }).catch(e=> message.channel.send("Suggestion Not Found"))
 message.channel.send("The Request has been Denied")
  }
}