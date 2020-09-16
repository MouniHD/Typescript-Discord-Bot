import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'Client'
        })
    }

    public exec(): void {
        console.log(`Logged in as ${this.client.user.tag}`)
        console.log(`Loaded ${this.client.commandHandler.modules.size} Command(s)`)
        console.log(`Loaded ${this.client.listenerHandler.modules.size} Event(s)`)
    }
}