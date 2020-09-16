import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class SayCommand extends Command {
    public constructor() {
        super('say', {
            aliases: ["say", "said"],
            description: {
                content: "Say something using the Bot(s)",
                usage: "say (message)",
                example: "Say Mouni is L33T"
            },
            category: "Miscellaneous",
            ratelimit: 3,
            args: [
                {
                    id: 'msg',
                    type: 'string',
                    match: 'content',
                    prompt: {
                        start: (msg: Message) => new MessageEmbed()
                        .setColor(0xD14748)
                        .setDescription(`⛔ Could not find your argument, please try again.`)
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { msg }): Promise<Message> {
        return message.util.send(msg);
    }
}