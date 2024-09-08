import { CommandInteraction, ApplicationCommandType } from "discord.js";
import { CustomCommandInteraction } from "../../models/CustomCommandInteraction";
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
 * 
 * @note Currently, if you use this decorator, you must import the module in which the interaction's is defined due to how Node.js loads modules
 */
export function RegisterCommandInteraction(name: string, description: string, defaultPermission = true, type: ApplicationCommandType = 1) {
    return function <T extends { new(...args: any[]): CustomCommandInteraction<CommandInteraction> }>(clazz: T) {
        clazz.prototype.name = name;
        clazz.prototype.description = description;
        clazz.prototype.defaultPermission = defaultPermission;
        clazz.prototype.type = type;

        commandsInstances.add(clazz.prototype);

        return clazz;
    };
};

/**
 * Decorating a button interaction class will automatically register it to the client
 * @param id The id of the button
 * 
 * @note Currently, if you use this decorator, you must import the module in which the interaction's is defined due to how Node.js loads modules
 */
export function RegisterButtonInteraction(id: string) {
    return function <T extends { new(...args: any[]): CustomButtonInteraction }>(clazz: T) {
        clazz.prototype.name = id;

        buttonsInstances.add(clazz.prototype);

        return clazz;
    };
};

/**
 * Decorating a select menu interaction class will automatically register it to the client
 * @param id The id of the select menu
 * 
 * @note Currently, if you use this decorator, you must import the module in which the interaction's is defined due to how Node.js loads modules
 */
export function RegisterSelectMenuInteraction(id: string) {
    return function <T extends { new(...args: any[]): CustomSelectMenuInteraction }>(clazz: T) {
        clazz.prototype.name = id;

        selectMenusInstances.add(clazz.prototype);

        return clazz;
    };
};

/**
 * Decorating a modal interaction class will automatically register it to the client
 * @param id The id of the modal
 * 
 * @note Currently, if you use this decorator, you must import the module in which the interaction's is defined due to how Node.js loads modules
 */
export function RegisterModalInteraction(id: string) {
    return function <T extends { new(...args: any[]): CustomModalInteraction }>(clazz: T) {
        clazz.prototype.name = id;

        modalsInstances.add(clazz.prototype);

        return clazz;
    };
};