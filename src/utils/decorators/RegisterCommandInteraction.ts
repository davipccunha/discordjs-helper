import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { CustomCommandInteraction } from "../../models/CustomCommandInteraction";

/** @ignore */
export const commandsInstances = new Set<CustomCommandInteraction<CommandInteraction>>();

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
}