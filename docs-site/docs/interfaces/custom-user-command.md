---
title: CustomUserCommand
---

# `CustomUserCommand`
## About
The `CustomUserCommand` interface defines a user command. Classes implementing it must have:

`readonly name: string` - The name of the command  
`readonly defaultPermission: boolean` - Wether or not this command should be available to new guilds  
`execute(interaction: UserContextMenuCommandInteraction, client: ExtendedClient): Promise<void>` - The function to be executed when a user interaction with the same name as the class' attribute `name` is sent

> This class only defines the command. It does not register nor load the command.  
> *See [@RegisterUserCommand](../decorators/registers/register-user-command) and [ExtendedClient#registerCommands()](../classes/extended-client#registercommands)*

## Example
```typescript
import { CustomUserCommand, ExtendedClient } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, UserContextMenuCommandInteraction } from "discord.js";

export class GetIDCommand implements CustomUserCommand {
    name: string;
    type: ApplicationCommandType.User;
    defaultPermission: boolean;

    constructor() {
        this.name = "Get ID";
        this.type = ApplicationCommandType.User;
        this.defaultPermission = true;
    }

    async execute(interaction: UserContextMenuCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(interaction.targetId).catch(console.error);
    }
}
```