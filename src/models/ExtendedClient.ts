import { ApplicationCommandDataResolvable, ButtonInteraction, Client, Collection, CommandInteraction, IntentsBitField, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import config from '../config.json';
import { recursiveFiles } from "../utils/utils";
import { CustomCommand } from "./CustomCommand";
import { CustomInteraction, CustomInteractionType } from './CustomInteraction';
import { DiscordEvent } from "./DiscordEvent";

type InteractionFile<T extends CustomInteractionType> = {
    folder: string,
    cache: Collection<string, CustomInteraction<T>>
}

export class ExtendedClient extends Client {
    readonly guildIDs: string[] = config.guildIDs ?? this.guilds.cache.map(guild => guild.id);
    readonly events: Collection<string, DiscordEvent> = new Collection();

    readonly commands: Collection<string, CustomInteraction<CommandInteraction>> = new Collection();
    readonly buttons: Collection<string, CustomInteraction<ButtonInteraction>> = new Collection();
    readonly selectMenus: Collection<string, CustomInteraction<StringSelectMenuInteraction>> = new Collection();
    readonly modals: Collection<string, CustomInteraction<ModalSubmitInteraction>> = new Collection();

    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.AutoModerationConfiguration,
                IntentsBitField.Flags.AutoModerationExecution,
                IntentsBitField.Flags.DirectMessageReactions,
                IntentsBitField.Flags.DirectMessageTyping,
                IntentsBitField.Flags.DirectMessages,
                IntentsBitField.Flags.GuildEmojisAndStickers,
                IntentsBitField.Flags.GuildIntegrations,
                IntentsBitField.Flags.GuildInvites,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessageReactions,
                IntentsBitField.Flags.GuildMessageTyping,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildModeration,
                IntentsBitField.Flags.GuildPresences,
                IntentsBitField.Flags.GuildScheduledEvents,
                IntentsBitField.Flags.GuildVoiceStates,
                IntentsBitField.Flags.GuildWebhooks,
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.MessageContent
            ]
        });
    }

    private async loadEvents() {
        const events = await recursiveFiles('./dist/events');

        for (const eventName of events) {
            const event: DiscordEvent = (await import(eventName.replaceAll('\\', '/').replace('.ts', '').replace('dist', '..'))).default;
            this.events.set(event.name, event);
        }
    }

    private async loadInteractions<T extends CustomInteractionType>(file: InteractionFile<T>) {
        const interactions = await recursiveFiles(`./dist/interactions/${file.folder}`);

        for (const interaction of interactions) {
            const interactionPath = interaction.replaceAll('\\', '/').replace('.ts', '').replace('dist', '..');
            const interactionData: CustomInteraction<T> = (await import(interactionPath)).default;
            file.cache.set(interactionData.name, interactionData);
        }
    }

    async registerCommands(guildIDs: string[] = this.guildIDs) {
        for (const guildID of guildIDs) {
            const guild = await this.guilds.fetch(guildID);

            for (const command of this.commands.values()) {
                await guild.commands.create(command as CustomCommand<CommandInteraction> as ApplicationCommandDataResolvable);
            }
        }
    }

    async asMember(guildID: string) {
        const guild = await this.guilds.fetch(guildID);
        return await guild.members.fetch(this.user!.id);
    }

    async start(token: string) {
        await this.loadEvents();

        await this.loadInteractions({ folder: "commands", cache: this.commands });
        await this.loadInteractions({ folder: "buttons", cache: this.buttons });
        await this.loadInteractions({ folder: "selectMenus", cache: this.selectMenus });
        await this.loadInteractions({ folder: "modals", cache: this.modals });

        await this.login(token);
    }
}