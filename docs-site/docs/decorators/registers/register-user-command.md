---
title: RegisterUserCommand
---

# `@RegisterUserCommand`
## About
The `@RegisterUserCommand` decorator is applied to a class implementing the [CustomUserCommand](../interfaces/custom-user-command) interface. It registers the command to the cache and listens for command interactions with the same name.

It takes two arguments:

`name` - The name of the command  
`defaultPermission?` -  Whether the command should be enabled by default when the app is added to a guild. Defaults to `true`

> **If you use this decorator, you must load the module in which the interaction's is defined**

## Example
```typescript
import { CustomUserCommand, ExtendedClient, RegisterUserCommand } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, UserContextMenuCommandInteraction } from "discord.js";

@RegisterUserCommand("Get ID")
export class GetIDCommand implements CustomUserCommand {
    name!: string;
    type!: ApplicationCommandType.User;
    defaultPermission!: boolean;

    async execute(interaction: UserContextMenuCommandInteraction, client: ExtendedClient): Promise<void> {
        interaction.reply(interaction.targetId).catch(console.error);
    }
}
```