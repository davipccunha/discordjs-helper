import { ApplicationCommandDataResolvable, ButtonInteraction, Client, Collection, CommandInteraction, Guild, IntentsBitField, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { MessageEmbedBuilder } from "../utils/builders/MessageEmbedBuilder";
import { buttonsInstances, commandsInstances, modalsInstances, selectMenusInstances } from "../utils/decorators/RegisterInteraction";
import { CustomButtonInteraction } from "./CustomButtonInteraction";
import { CustomCommandInteraction } from "./CustomCommandInteraction";
import { CustomInteraction } from './CustomInteraction';
import { CustomModalInteraction } from "./CustomModalInteraction";
import { CustomSelectMenuInteraction } from "./CustomSelectMenuInteraction";

export class ExtendedClient extends Client {
    protected readonly _commands: Collection<string, CustomCommandInteraction<CommandInteraction>> = new Collection();
    protected readonly _buttons: Collection<string, CustomButtonInteraction> = new Collection();
    protected readonly _selectMenus: Collection<string, CustomSelectMenuInteraction> = new Collection();
    protected readonly _modals: Collection<string, CustomModalInteraction> = new Collection();

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
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@Register...Command` instead
     * @see RegisterChatInputCommandInteraction
     */
    public async registerCommands(...commands: CustomCommandInteraction<CommandInteraction>[]): Promise<void> {
        for (const command of commands) {
            this._commands.set(command.name, command);
        }
    }

    /**
     * Caches the buttons to respond to their interactions once they are triggered
     * @param buttons The buttons to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterButton` instead
     * @see RegisterButtonInteraction
     */
    public async registerButtons(...buttons: CustomInteraction<ButtonInteraction>[]) {
        for (const button of buttons) {
            this._buttons.set(button.name, button);
        }
    }

    /**
     * Caches the select menus to respond to their interactions once they are triggered
     * @param selectMenus The select menus to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterSelectMenu` instead
     * @see RegisterSelectMenuInteraction
     */
    public async registerSelectMenus(...selectMenus: CustomInteraction<StringSelectMenuInteraction>[]) {
        for (const selectMenu of selectMenus) {
            this._selectMenus.set(selectMenu.name, selectMenu);
        }
    }

    /**
     * Caches the modals to respond to their interactions once they are triggered
     * @param modals The modals to register
     * 
     * @note This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterModal` instead
     * @see RegisterModalInteraction
     */
    public async registerModals(...modals: CustomInteraction<ModalSubmitInteraction>[]) {
        for (const modal of modals) {
            this._modals.set(modal.name, modal);
        }
    }

    /**
     * Caches the interactions decorated with the @Register... decorators
     * 
     * @note This method is intended for TypeScript users. JavaScript users should use the explicit methods to register the interactions
     */
    protected async registerInteractions() {
        for (const command of commandsInstances) {
            this._commands.set(command.name, command);
        }

        for (const button of buttonsInstances) {
            this._buttons.set(button.name, button);
        }

        for (const selectMenu of selectMenusInstances) {
            this._selectMenus.set(selectMenu.name, selectMenu);
        }

        for (const modal of modalsInstances) {
            this._modals.set(modal.name, modal);
        }
    }

    /**
     * Loads the cached commands to a guild
     * @param guild The guild to create the commands in
     */
    protected async createCommands(guild: Guild) {
        for (const command of this._commands.values()) {
            await guild.commands.create(command as ApplicationCommandDataResolvable).catch(console.error);
        }
    }

    /**
     * Deletes a command from a guild
     * @param commandName The registered name of the command to delete
     * @param guild The guild to delete the command from
     */
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

    /**
     * Deletes a list of commands from the specified guilds
     * @param commandsNames The registered names of the commands to delete
     * @param guildIDs The IDs of the guilds to delete the commands from. Defaults to all guilds the bot is in
     */
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
                const command = this._commands.get(interaction.commandName);
                if (!command) return;

                await command.execute(interaction, this);
            } else if (interaction.isButton()) {
                const button = this._buttons.get(interaction.customId);
                if (!button) return;

                await button.execute(interaction, this);
            } else if (interaction.isStringSelectMenu()) {
                const selectMenu = this._selectMenus.get(interaction.customId);
                if (!selectMenu) return;

                await selectMenu.execute(interaction, this);
            } else if (interaction.isModalSubmit()) {
                const modal = this._modals.get(interaction.customId);
                if (!modal) return;

                await modal.execute(interaction, this);
            }
        });
    }

    /**
     * Logs the bot, registers the interactions and starts listening for interactions creation
     * @param autoRegisterInteractions This should be set to `false` if you are not using TS or not using the decorators to register the interactions
     */
    public async start(autoRegisterInteractions = true) {
        await this.login();

        if (autoRegisterInteractions) await this.registerInteractions();

        await this.handleEvents();
    }
}