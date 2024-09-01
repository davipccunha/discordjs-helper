import { PermissionResolvable } from "discord.js";

/**
 * Decorating an interaction class with this decorator will make it so that it will only execute if the user has all of the specified permissions.
 * @param permissions The permissions to check for.
 */
export function RequirePermission(...permissions: PermissionResolvable[]) {
    return function (constructor: any) {
        const originalExecute = constructor.prototype.execute;

        if (typeof originalExecute !== 'function') {
            throw new Error(`RequirePermission decorator: The class ${constructor.name} does not have an 'execute' method.`);
        }

        constructor.prototype.execute = async function (...args: any[]) {
            const interaction = args[0];
            if (!interaction?.member?.permissions) return;

            const hasPermission = permissions.every(permission => interaction.member.permissions.has(permission));

            if (!hasPermission) {
                if (interaction.replied || interaction.deferred) return;

                await interaction.reply({ content: 'Você não tem permissão para fazer isso.', ephemeral: true });
                return;
            }

            return originalExecute.apply(this, args);
        };
    };
}