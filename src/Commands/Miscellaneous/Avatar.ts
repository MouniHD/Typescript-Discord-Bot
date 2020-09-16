import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, ImageSize } from "discord.js";

export default class AvatarCommand extends Command {
    public constructor() {
        super('avatar', {
            aliases: ["avatar", "av"],
            description: {
                content: "View an User or Bot Avatar(s)",
                usage: "avatar (@user/username/id)",
                example: "Avatar @mouni"
            },
            category: "Miscellaneous",
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member
                },
                {
                    id: "size",
                    type: (_: Message, str: string): null | Number => {
                        if(str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str))) return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["-size="],
                    default: 2048
                }
            ]
        })
    }

    public exec(message: Message, { member, size }: { member: GuildMember, size: number }): Promise<Message> {
        return message.util.send(new MessageEmbed()
        .setColor(0xF6D653)
        .setAuthor("Avatar(s)", this.client.user.displayAvatarURL())
        .setFooter(member.user.tag)
        .setImage(member.user.displayAvatarURL({ dynamic: true ,size: size as ImageSize })))
    }
}