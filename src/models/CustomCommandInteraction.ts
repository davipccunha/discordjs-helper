import { ApplicationCommandOptionChoiceData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, CommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";
import { ExtendedClient } from "./ExtendedClient";

export type CommandOption = {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required?: boolean;
    choices?: ApplicationCommandOptionChoiceData[];
    options?: CommandOption[];
}

export type NumberCommandOption = CommandOption & {
    type: ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number;
    minValue?: number;
    maxValue?: number;
}

export type StringCommandOption = CommandOption & {
    type: ApplicationCommandOptionType.String;
    minLength?: number;
    maxLength?: number;
}

export interface CustomCommandInteraction<K extends CommandInteraction> extends CustomInteraction<K> {
    readonly type: ApplicationCommandType;
    readonly defaultPermission: boolean;
    readonly description: string;
    execute(interaction: K, client: ExtendedClient): Promise<void>;
}



export interface CustomChatInputCommand extends CustomCommandInteraction<ChatInputCommandInteraction> {
    readonly type: ApplicationCommandType.ChatInput;
    readonly description: string;
    readonly options?: CommandOption[];
}

export interface CustomMessageCommand extends CustomCommandInteraction<MessageContextMenuCommandInteraction> {
    readonly type: ApplicationCommandType.Message;
    readonly description: never;
}

export interface CustomUserCommand extends CustomCommandInteraction<UserContextMenuCommandInteraction> {
    readonly type: ApplicationCommandType.User;
    readonly description: never;
}