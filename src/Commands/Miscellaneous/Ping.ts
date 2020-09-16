import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ["ping"],
            description: {
                content: "View latency of Bot(s)",
                usage: "ping",
                example: "Ping"
            },
            category: "Miscellaneous",
            ratelimit: 4
        });
    }

    public async exec(message: Message): Promise<Message> {

        const messages = await message.util.send(new MessageEmbed()
        .setColor(0xF6D653)
        .setTitle("🏓 Pinging..."))

        const latency = messages.createdTimestamp - message.createdTimestamp;

        return messages.edit(new MessageEmbed()
        .setColor(0xF6D653)
        .setTitle("Latency")
        .setDescription(`- **Messages:** \`${latency}ms\`\n- **Bot / API:** \`${Math.round(this.client.ws.ping)}ms\``)
        .setFooter(`Replying ${message.author.tag}`, message.author.displayAvatarURL()))

    }
}