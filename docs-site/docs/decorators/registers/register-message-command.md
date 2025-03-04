---
title: RegisterMessageCommand
---

# `@RegisterMessageCommand`
## About
The `@RegisterMessageCommand` decorator is applied to a class implementing the [CustomMessageCommand](../../interfaces/custom-message-command) interface. It registers the command to the cache and listens for command interactions with the same name.

It takes two arguments:

`name` - The name of the command  
`defaultPermission?` -  Whether the command should be enabled by default when the app is added to a guild. Defaults to `true`

> If you use this decorator, you must load the module in which the interaction is defined

## Example
```typescript
import { CustomMessageCommand, ExtendedClient, RegisterMessageCommand } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, MessageContextMenuCommandInteraction } from "discord.js";

@RegisterMessageCommand("Length")
export class LengthCommand implements CustomMessageCommand {
    name!: string;
    type!: ApplicationCommandType.Message;
    defaultPermission!: boolean;

    async execute(interaction: MessageContextMenuCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(interaction.targetMessage.content.length.toString()).catch(console.error);
    }
}
```