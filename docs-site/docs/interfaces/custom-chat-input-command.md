---
title: CustomChatInputCommand
---

# `CustomChatInputCommand`
## About
The `CustomChatInputCommand` interface defines a chat input command. Classes implementing it must have:

`readonly name: string` - The name of the command  
`readonly description: string` - The description of the command  
`readonly defaultPermission: boolean` - Wether or not this command should be available to new guilds  
`options?: CommandOption[]` - The options or arguments the command has. Defaults to `[]` - *See [CommandOption](../types/command-option.md)*  
`execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void>` - The function to be executed when a chat input interaction with the same name as the class' attribute `name` is sent

> This class only defines the command. It does not register nor load the command.  
> *See [@RegisterChatInputCommand](../decorators/register-chat-input-command) and [ExtendedClient#registerCommands()](../classes/extended-client#registercommands)*

## Example
```typescript
import { CustomChatInputCommand, ExtendedClient } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

export class PingCommand implements CustomChatInputCommand {
    name: string;
    description: string;
    type: ApplicationCommandType.ChatInput;
    defaultPermission: boolean;

    constructor() {
        this.name = "ping";
        this.description = "Ping the bot!";
        this.type = ApplicationCommandType.ChatInput;
        this.defaultPermission = true;
    }

    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply('Pong!').catch(console.error);
    }
}
```