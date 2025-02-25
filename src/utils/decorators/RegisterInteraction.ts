import { CommandInteraction, ApplicationCommandType } from "discord.js";
import { CustomChatInputCommand, CustomCommandInteraction, CustomMessageCommand, CustomUserCommand } from "../../models/CustomCommandInteraction";
import { CustomButtonInteraction } from "../../models/CustomButtonInteraction";
import { CustomSelectMenuInteraction } from "../../models/CustomSelectMenuInteraction";
import { CustomModalInteraction } from "../../models/CustomModalInteraction";

/** @ignore */
export const commandsInstances = new Set<CustomCommandInteraction<CommandInteraction>>();
/** @ignore */
export const buttonsInstances = new Set<CustomButtonInteraction>();
/** @ignore */
export const selectMenusInstances = new Set<CustomSelectMenuInteraction>();
/** @ignore */
export const modalsInstances = new Set<CustomModalInteraction>();

/**
 * Decorating a command interaction class will automatically register it to the client
 * @param name The name of the command
 * @param description The description of the command
 * @param defaultPermission Whether the command should be enabled by default when the app is added to a guild. Defaults to `true`
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterChatInputCommandInteraction(
    name: string,
    description: string,
    defaultPermission = true
) {
    return function <T extends { new(...args: any[]): CustomChatInputCommand }>(clazz: T) {
        const instance = new clazz();

        if (!instance.name) Object.defineProperty(instance, "name", { value: name, writable: false });
        if (!instance.description) Object.defineProperty(instance, "description", { value: description, writable: false });
        if (!instance.defaultPermission) Object.defineProperty(instance, "defaultPermission", { value: defaultPermission, writable: false });
        Object.defineProperty(instance, "type", { value: ApplicationCommandType.ChatInput, writable: false });

        commandsInstances.add(instance);

        return clazz;
    };
};

/**
 * Decorating a command interaction class will automatically register it to the client
 * @param name The name of the command
 * @param defaultPermission Whether the command should be enabled by default when the app is added to a guild. Defaults to `true`
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterMessageCommandInteraction(
    name: string,
    defaultPermission = true
) {
    return function <T extends { new(...args: any[]): CustomMessageCommand }>(clazz: T) {
        const instance = new clazz();

        if (!instance.name) Object.defineProperty(instance, "name", { value: name, writable: false });
        if (!instance.defaultPermission) Object.defineProperty(instance, "defaultPermission", { value: defaultPermission, writable: false });
        Object.defineProperty(instance, "type", { value: ApplicationCommandType.Message, writable: false });

        commandsInstances.add(instance);

        return clazz;
    };
};

/**
 * Decorating a command interaction class will automatically register it to the client
 * @param name The name of the command
 * @param description The description of the command
 * @param defaultPermission Whether the command should be enabled by default when the app is added to a guild. Defaults to `true`
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterUserCommandInteraction(
    name: string,
    defaultPermission = true
) {
    return function <T extends { new(...args: any[]): CustomUserCommand }>(clazz: T) {
        const instance = new clazz();

        if (!instance.name) Object.defineProperty(instance, "name", { value: name, writable: false });
        if (!instance.defaultPermission) Object.defineProperty(instance, "defaultPermission", { value: defaultPermission, writable: false });
        Object.defineProperty(instance, "type", { value: ApplicationCommandType.User, writable: false });

        commandsInstances.add(instance);

        return clazz;
    };
};

/**
 * Decorating a button interaction class will automatically register it to the client
 * @param id The id of the button
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterButtonInteraction(id: string) {
    return function <T extends { new(...args: any[]): CustomButtonInteraction }>(clazz: T) {
        const instance = new clazz();

        if (!instance.name) Object.defineProperty(instance, "name", { value: id, writable: false });

        buttonsInstances.add(instance);

        return clazz;
    };
};

/**
 * Decorating a select menu interaction class will automatically register it to the client
 * @param id The id of the select menu
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterSelectMenuInteraction(id: string) {
    return function <T extends { new(...args: any[]): CustomSelectMenuInteraction }>(clazz: T) {
        const instance = new clazz();

        if (!instance.name) Object.defineProperty(instance, "name", { value: id, writable: false });

        selectMenusInstances.add(instance);

        return clazz;
    };
};

/**
 * Decorating a modal interaction class will automatically register it to the client
 * @param id The id of the modal
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterModalInteraction(id: string) {
    return function <T extends { new(...args: any[]): CustomModalInteraction }>(clazz: T) {
        const instance = new clazz();

        if (!instance.name) Object.defineProperty(instance, "name", { value: id, writable: false });

        modalsInstances.add(instance);

        return clazz;
    };
};