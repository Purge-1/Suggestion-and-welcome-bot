const { Client, Collection } = require("discord.js")
const { readdirSync } = require("fs");
const chalk = require("chalk")

module.exports = class DevClient extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection
        this.aliases = new Collection
        this.paths = new Collection
        this.devs = ["805856431839641690", "805856656297951242"] // put your user id here.
    }

    loadCommands(client) {
["command"].forEach(handler => {
    require(`../handlers/${handler}`)(client);
});
}

log(type, message) {
    if (!message) {
        return;
    }
    if (!type) {
        return console.log(chalk.bold.green("[UNKNOWN]: ") + message)
    }
    console.log(chalk.bold.green("[" + type + "]: ") + message)
}

error(type, message) {
    if (!message) {
        return;
    }
    if (!type) {
        return console.log(chalk.bold.red("[UNKNOWN]: ") + message)
    }
    console.log(chalk.bold.red("[" + type + "]: ") + message)
}

start(token) {
    if (!token) {
        return console.error("ERROR", "Token Not Provided")
    }
    super.login(token)
}
}