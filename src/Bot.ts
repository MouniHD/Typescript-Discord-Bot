import { token, owners } from "./Utils/Config";
import BotClient from "./Client/Client";

const client: BotClient = new BotClient({ token, owners });
client.start();