import { CustomButtonInteraction } from "../../models/CustomButtonInteraction";

/** @ignore */
export const buttonsInstances = new Set<CustomButtonInteraction>();

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
}