import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { join } from "path";
import { owners, prefix } from "../Utils/Config";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
    }
}

interface BotOptions {
    token?: string,
    owners?: string[];
}

export default class BotClient extends AkairoClient {
    public config: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "Events")
    });

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "Commands"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 6e4,
        argumentDefaults: {
            prompt: {
                modifyStart: (_ : Message) => new MessageEmbed()
                .setColor(0xD14748)
                .setDescription(`⛔ Type **Cancel** To Cancel the Command(s).`),
                modifyRetry: (_ : Message) => new MessageEmbed()
                .setColor(0xD14748)
                .setDescription(`⛔ Type **Cancel** To Cancel the Command(s).`),
                timeout: new MessageEmbed()
                .setColor(0xD14748)
                .setDescription(`⛔ Time ran out, command has been cancelled.`),
                ended: new MessageEmbed()
                .setColor(0xD14748)
                .setDescription(`⛔ Command has been ended.`),
                cancel: new MessageEmbed()
                .setColor(0xD14748)
                .setDescription(`⛔ Command has been cancelled.`),
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        },
        ignorePermissions: owners,
        ignoreCooldown: owners
    })

    public constructor(config: BotOptions) {
        super({
            ownerID: config.owners
        });
        this.config = config
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token)
    }
}