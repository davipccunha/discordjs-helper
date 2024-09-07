import { CustomSelectMenuInteraction } from "../../models/CustomSelectMenuInteraction";

/** @ignore */
export const selectMenusInstances = new Set<CustomSelectMenuInteraction>();

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
}