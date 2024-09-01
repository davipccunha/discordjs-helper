import { ApplicationCommandDataResolvable, ButtonInteraction, Client, Collection, CommandInteraction, Guild, IntentsBitField, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { CustomButtonInteraction } from "./CustomButtonInteraction";
import { CustomCommand } from "./CustomCommand";
import { CustomInteraction } from './CustomInteraction';
import { CustomModalInteraction } from "./CustomModalInteraction";
import { CustomSelectMenuInteraction } from "./CustomSelectMenuInteraction";

export class ExtendedClient extends Client {
    readonly commands: Collection<string, CustomCommand<CommandInteraction>> = new Collection();
    readonly buttons: Collection<string, CustomButtonInteraction> = new Collection();
    readonly selectMenus: Collection<string, CustomSelectMenuInteraction> = new Collection();
    readonly modals: Collection<string, CustomModalInteraction> = new Collection();

    constructor(token: string) {
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

        this.token = token;
    }

    public async registerCommands(...commands: CustomCommand<CommandInteraction>[]) {
        for (const command of commands) {
            this.commands.set(command.name, command);
        }
    }

    public async registerButtons(...buttons: CustomInteraction<ButtonInteraction>[]) {
        for (const button of buttons) {
            this.buttons.set(button.name, button);
        }
    }

    public async registerSelectMenus(...selectMenus: CustomInteraction<StringSelectMenuInteraction>[]) {
        for (const selectMenu of selectMenus) {
            this.selectMenus.set(selectMenu.name, selectMenu);
        }
    }

    public async registerModals(...modals: CustomInteraction<ModalSubmitInteraction>[]) {
        for (const modal of modals) {
            this.modals.set(modal.name, modal);
        }
    }

    private async createCommands(guild: Guild) {
        for (const command of this.commands.values()) {
            const discordCommand = command as CustomCommand<CommandInteraction> as ApplicationCommandDataResolvable;
            await guild.commands.create(discordCommand).catch(console.error);
        }
    }

    public async loadCommands(...guildIDs: string[]) {
        this.once('ready', async () => {
            if (guildIDs.length === 0) {
                this.guilds.cache.forEach(async guild => {
                    await this.createCommands(guild);
                });
            } else {
                for (const guildID of guildIDs) {
                    const guild = await this.guilds.fetch(guildID);

                    if (!guild) return;

                    await this.createCommands(guild);
                }
            }
        });
    }

    async asMember(guildID: string) {
        if (!this.user) return null;

        const guild = await this.guilds.fetch(guildID).catch(console.error);
        if (!guild) return null;

        const member = await guild.members.fetch(this.user.id).catch(console.error);
        if (!member) return null;

        return member;
    }

    private async handleEvents() {
        this.once('ready', async () => {
            console.log(`Client logged in @ ${new Date().toLocaleString()}`);
        })

        this.on('interactionCreate', async interaction => {
            if (interaction.isCommand()) {
                const command = this.commands.get(interaction.commandName);
                if (!command) return;

                await command.execute(interaction, this);
            } else if (interaction.isButton()) {
                const button = this.buttons.get(interaction.customId);
                if (!button) return;

                await button.execute(interaction, this);
            } else if (interaction.isStringSelectMenu()) {
                const selectMenu = this.selectMenus.get(interaction.customId);
                if (!selectMenu) return;

                await selectMenu.execute(interaction, this);
            } else if (interaction.isModalSubmit()) {
                const modal = this.modals.get(interaction.customId);
                if (!modal) return;

                await modal.execute(interaction, this);
            }
        });
    }

    async start() {
        await this.login();
        await this.handleEvents();
    }
}