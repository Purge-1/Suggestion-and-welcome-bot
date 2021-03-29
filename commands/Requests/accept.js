const Discord = require("discord.js")
module.exports = {
  name: "accept",
  run: async (client, message, args) => {
      if (message.member.guild.id !== "797037790205444105") {
          return message.channel.send("This command is for Rubytopia only.")
      }
    if (!message.member.roles.cach.has("804775362604302416")){
        return message.channel.send(":x: | You do not have the developer role.")
    }
    const channel = client.channels.cache.get("805858311400062996")
    try {
        await channel.messages.fetch(args[0])
    } catch (err) {
    return message.channel.send(":x: | **There was an error Trying to execute that command**: " + err)
}

const msg =  await channel.messages.fetch(args[0])
    if (!msg) {
    message.channel.send("Request Not Found!")
    }
    let note = args.slice(1).join(" ")
    if (!note) {
      note = "None"
    }
    let member = client.users.cache.find(m=> m.tag === msg.embeds[0].author.name)
    if (!member) {
        message.channel.send("The User Who Requested That Was Not Found, maybe they left?")
    }
    if (member) {
        member.send("Your Request Was Accepted By " + message.author.tag + " With The Note: " + note)
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
    .addField(`Suggestion`, msg.embeds[0].fields[0].value)
    .addField(`Status`, "accepted")
    .addField("Accepted By", message.author.tag)
    .addField(`Notes`, note)
    .setColor("#00FF30")
 msg.edit({
     embed: embed
 }).catch(e=> message.channel.send("Suggestion Not Found"))
 message.channel.send("The request has been accepted")
  }
}