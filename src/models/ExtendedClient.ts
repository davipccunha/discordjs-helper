import { ApplicationCommandDataResolvable, ButtonInteraction, Client, Collection, CommandInteraction, Guild, IntentsBitField, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { buttonsInstances } from "../utils/decorators/RegisterButtonInteraction";
import { commandsInstances } from "../utils/decorators/RegisterCommandInteraction";
import { modalsInstances } from "../utils/decorators/RegisterModalInteraction";
import { selectMenusInstances } from "../utils/decorators/RegisterSelectMenuInteraction";
import { CustomButtonInteraction } from "./CustomButtonInteraction";
import { CustomCommandInteraction } from "./CustomCommandInteraction";
import { CustomInteraction } from './CustomInteraction';
import { CustomModalInteraction } from "./CustomModalInteraction";
import { CustomSelectMenuInteraction } from "./CustomSelectMenuInteraction";
import { MessageEmbedBuilder } from "../utils/builders/MessageEmbedBuilder";

export class ExtendedClient extends Client {
    protected readonly commands: Collection<string, CustomCommandInteraction<CommandInteraction>> = new Collection();
    protected readonly buttons: Collection<string, CustomButtonInteraction> = new Collection();
    protected readonly selectMenus: Collection<string, CustomSelectMenuInteraction> = new Collection();
    protected readonly modals: Collection<string, CustomModalInteraction> = new Collection();

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

    /**
     * Caches the commands to respond to their interactions once they are triggered
     * @param commands The commands to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterCommandInteraction` instead
     * @see RegisterCommandInteraction
     */
    public async registerCommands(...commands: CustomCommandInteraction<CommandInteraction>[]) {
        for (const command of commands) {
            this.commands.set(command.name, command);
        }
    }

    /**
     * Caches the buttons to respond to their interactions once they are triggered
     * @param buttons The buttons to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterButtonInteraction` instead
     * @see RegisterButtonInteraction
     */
    public async registerButtons(...buttons: CustomInteraction<ButtonInteraction>[]) {
        for (const button of buttons) {
            this.buttons.set(button.name, button);
        }
    }

    /**
     * Caches the select menus to respond to their interactions once they are triggered
     * @param selectMenus The select menus to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterSelectMenuInteraction` instead
     * @see RegisterSelectMenuInteraction
     */
    public async registerSelectMenus(...selectMenus: CustomInteraction<StringSelectMenuInteraction>[]) {
        for (const selectMenu of selectMenus) {
            this.selectMenus.set(selectMenu.name, selectMenu);
        }
    }

    /**
     * Caches the modals to respond to their interactions once they are triggered
     * @param modals The modals to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterModalInteraction` instead
     * @see RegisterModalInteraction
     */
    public async registerModals(...modals: CustomInteraction<ModalSubmitInteraction>[]) {
        for (const modal of modals) {
            this.modals.set(modal.name, modal);
        }
    }

    protected async registerInteractions() {
        for (const command of commandsInstances) {
            this.commands.set(command.name, command);
        }

        for (const button of buttonsInstances) {
            this.buttons.set(button.name, button);
        }

        for (const selectMenu of selectMenusInstances) {
            this.selectMenus.set(selectMenu.name, selectMenu);
        }

        for (const modal of modalsInstances) {
            this.modals.set(modal.name, modal);
        }
    }

    protected async createCommands(guild: Guild) {
        for (const command of this.commands.values()) {
            const discordCommand = command as CustomCommandInteraction<CommandInteraction> as ApplicationCommandDataResolvable;
            await guild.commands.create(discordCommand).catch(console.error);
        }
    }

    protected async unregisterCommand(commandName: string, guild: Guild) {
        guild.commands.create({
            name: commandName,
            description: 'Deleted'
        }).then(command => {
            command.delete();
            console.log(`Command ${commandName} deleted`);
        }).catch(console.error);
    }

    /**
     * Creates the registered commands in the specified guilds
     * @param guildIDs The IDs of the guilds to create the commands in. If no IDs are provided, the commands will be created in all guilds the bot is in
     */
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

    public async deleteCommands(commandsNames: string[], guildIDs: string[] = []) {
        this.once('ready', async () => {
            if (guildIDs.length === 0) {
                this.guilds.cache.forEach(async guild => {
                    for (const commandName of commandsNames) {
                        await this.unregisterCommand(commandName, guild);
                    }
                });
            } else {
                for (const guildID of guildIDs) {
                    const guild = await this.guilds.fetch(guildID);

                    if (!guild) return;

                    for (const commandName of commandsNames) {
                        await this.unregisterCommand(commandName, guild);
                    }
                }
            }
        });
    }

    /**
     * Returns the bot as a member of a guild
     * @param guildID The ID of the guild
     * @returns Member representation of the bot
     */
    public async asMember(guildID: string) {
        if (!this.user) return null;

        const guild = await this.guilds.fetch(guildID).catch(console.error);
        if (!guild) return null;

        const member = await guild.members.fetch(this.user.id).catch(console.error);
        if (!member) return null;

        return member;
    }

    // Logs a message when the client becomes ready and handle interactions (commands, buttons, select menus, modals)
    protected async handleEvents() {
        this.once('ready', async () => {
            console.log(`Client logged in @ ${new Date().toLocaleString()}`);

            MessageEmbedBuilder.defaultFooter = { text: this.user!.username, iconURL: this.user!.displayAvatarURL({ forceStatic: false }) };
        });

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

    /**
     * Logs the bot, registers the interactions and starts listening to the interactionCreate event
     * @param registerInteractions This should be set to `false` if you are not using TS or prefer not to use the decorators to the interactions
     */
    async start(registerInteractions = true) {
        await this.login();

        if (registerInteractions) await this.registerInteractions();

        await this.handleEvents();
    }
}