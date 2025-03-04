---
title: RequireMemberPermission
---

# `@RequireMemberPermission`
## About
The `@RequireMemberPermission` decorator is applied to a class implementing any [CustomInteraction interface](../../category/interfaces). It makes so that the `execute` method of the interaction is only run if the user triggering it has all permissions passed as argument in the guild scope.

It takes any number of [PermissionResolvable](https://discord.js.org/docs/packages/discord.js/14.18.0/PermissionResolvable:TypeAlias) as arguments:

`...permissions: PermissionResolvable[]` - The permissions to check for  
___
It throws an error if applied to a class that does not have an 'execute' method.

## Example
```typescript
import { CustomChatInputCommand, ExtendedClient, RegisterChatInputCommand, RequireMemberPermission } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

@RegisterChatInputCommand("ping", "Ping the bot!")
@RequireMemberPermission(PermissionFlagsBits.Administrator)
export class PingCommand implements CustomChatInputCommand {
    name!: string;
    description!: string;
    type!: ApplicationCommandType.ChatInput;
    defaultPermission!: boolean;

    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply('Pong!').catch(console.error);
    }
}
```

> The `execute` method will only execute if the user who triggered the interaction has Administrator permissions in the **guild** scope. If this fails, a No Permission message is sent
> This message can be changed by using ErrorMessages.NoPermission = "New no permission message"