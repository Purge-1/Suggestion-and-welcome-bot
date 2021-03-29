const { Message } = require("discord.js");

module.exports = {
    name: "reload",
    devsOnly: true,
    run: async (client, message, args) => {
let cmd = args[0]
if (!cmd) {
    return message.channel.send("Command Not Found")
}
let path = client.paths.get(cmd)
if (!path) {
    return message.channel.send("Command Not Found")
}
try {
    delete require.cache[require.resolve(path)];
    client.commands.delete(cmd)

    const pull = require(path)
    client.commands.set(cmd, pull)
    return message.channel.send("The Command Has Been Reloaded")
} catch(err) {
return message.channel.send(err)
}
    }
}