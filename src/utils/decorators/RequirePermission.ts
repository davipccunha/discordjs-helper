import { GuildMember, PermissionResolvable } from "discord.js";
import { CustomInteractionType } from "../../models/CustomInteraction";

/**
 * Decorating an interaction class with this will make it so that it will only execute if the member has all of the specified permissions in the guild scope.
 * @param permissions The permissions to check for.
 */
export function RequireMemberPermission(...permissions: PermissionResolvable[]) {
    return function (constructor: any) {
        const originalExecute = constructor.prototype.execute;

        if (typeof originalExecute !== 'function') {
            throw new Error(`RequirePermission decorator: The class ${constructor.name} does not have an 'execute' method.`);
        }

        constructor.prototype.execute = async function (...args: any[]) {
            const interaction: CustomInteractionType = args[0];
            if (!interaction?.member?.permissions) return;

            const hasPermission = (interaction.member as GuildMember).permissions.has(permissions);

            if (!hasPermission) {
                await interaction.replyOrFollowUp({ content: 'Você não tem permissão para fazer isso.', ephemeral: true });
                return;
            }

            return originalExecute.apply(this, args);
        };
    };
}

/**
 * Decorating an interaction class with this will make it so that it will only execute if the member has all of the specified permissions in the interaction channel.
 * @param permissions The permissions to check for.
 */
export function RequireChannelPermission(...permissions: PermissionResolvable[]) {
    return function (constructor: any) {
        const originalExecute = constructor.prototype.execute;

        if (typeof originalExecute !== 'function') {
            throw new Error(`RequirePermission decorator: The class ${constructor.name} does not have an 'execute' method.`);
        }

        constructor.prototype.execute = async function (...args: any[]) {
            const interaction: CustomInteractionType = args[0];
            if (!interaction?.member?.permissions) return;

            if (!interaction.channel || interaction.channel.isDMBased()) return;

            const hasPermission = interaction.channel.permissionsFor(interaction.member as GuildMember).has(permissions);

            if (!hasPermission) {
                await interaction.replyOrFollowUp({ content: 'Você não tem permissão para fazer isso.', ephemeral: true });
                return;
            }

            return originalExecute.apply(this, args);
        };
    };
}