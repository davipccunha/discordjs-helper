import { CommandInteraction, ApplicationCommandType } from "discord.js";
import { CustomChatInputCommand, CustomCommandInteraction } from "../../models/CustomCommandInteraction";
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
 * @param defaultPermission Whether the command should be enabled by default when the app is added to a guild
 * @param type The type of the command
 * 
 * @note If you use this decorator, you must import/load the module in which the interaction is defined
 */
export function RegisterCommandInteraction(
    name: string,
    description: string,
    defaultPermission = true,
    type: ApplicationCommandType = 1
) {
    return function <T extends { new(...args: any[]): CustomCommandInteraction<CommandInteraction> }>(clazz: T) {
        const instance = new clazz();

        Object.defineProperty(instance, "name", { value: name, writable: false });
        if (type === 1) Object.defineProperty(instance, "description", { value: description, writable: false });
        Object.defineProperty(instance, "defaultPermission", { value: defaultPermission, writable: false });
        Object.defineProperty(instance, "type", { value: type, writable: false });

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

        Object.defineProperty(instance, "name", { value: id, writable: false });

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

        Object.defineProperty(instance, "name", { value: id, writable: false });

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

        Object.defineProperty(instance, "name", { value: id, writable: false });

        modalsInstances.add(instance);

        return clazz;
    };
};