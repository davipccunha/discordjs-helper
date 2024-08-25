export function NoReplyInteraction() {
    return function (constructor: any) {
        const originalExecute = constructor.prototype.execute;

        if (typeof originalExecute !== 'function') {
            throw new Error(`NoReplyInteraction decorator: The class ${constructor.name} does not have an 'execute' method.`);
        }

        constructor.prototype.execute = async function (...args: any[]) {
            const result = await originalExecute.apply(this, args);
            const interaction = args[0];

            if (!interaction || interaction.replied || interaction.deferred) return result;

            await interaction.deferReply().catch(console.error);
            await interaction.deleteReply().catch(console.error);

            return result;
        };
    };
}