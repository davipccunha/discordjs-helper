---
title: CustomMessageCommand
---

# `CustomMessageCommand`
## About
The `CustomMessageCommand` interface defines a message command. Classes implementing it must have:

`readonly name: string` - The name of the command  
`readonly defaultPermission: boolean` - Wether or not this command should be available to new guilds  
`execute(interaction: MessageContextMenuCommandInteraction, client: ExtendedClient): Promise<void>` - The function to be executed when a message interaction with the same name as the class' attribute `name` is sent

> This class only defines the command. It does not register nor load the command.  
> *See [@RegisterMessageCommand](../decorators/register-message-command) and [ExtendedClient#registerCommands()](../category/decorators)*

## Example
```typescript
import { CustomMessageCommand, ExtendedClient } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, MessageContextMenuCommandInteraction } from "discord.js";

export class LengthCommand implements CustomMessageCommand {
    name: string;
    type: ApplicationCommandType.Message;
    defaultPermission: boolean;

    constructor() {
        this.name = "Length";
        this.type = ApplicationCommandType.Message;
        this.defaultPermission = true;
    }

    async execute(interaction: MessageContextMenuCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(interaction.targetMessage.content.length.toString());
    }
}
```