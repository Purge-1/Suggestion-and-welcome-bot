const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
               client.paths.set(pull.name, `../../commands/${dir}/${file}`)
               client.log("COMMAND", `loaded The Command ${pull.name}`)
            } else {
               client.error("COMMAND", `${file} -> missing a help.name, or help.name is not a string.`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => {
                client.aliases.set(alias, pull.name)
                client.paths.set(alias, `../../commands/${dir}/${file}`)
            });
        }
    });
    
}