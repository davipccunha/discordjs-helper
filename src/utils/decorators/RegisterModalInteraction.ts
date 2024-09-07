import { CustomModalInteraction } from "../../models/CustomModalInteraction";

/** @ignore */
export const modalsInstances = new Set<CustomModalInteraction>();

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
}