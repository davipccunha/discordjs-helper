---
title: RegisterChatInputCommand
---

# `@RegisterChatInputCommand`
## About
The `@RegisterChatInputCommand` decorator is applied to a class implementing the [CustomChatInputCommand](../interfaces/custom-chat-input-command) interface. It registers the command to the cache and listens for command interactions with the same name.

It takes three arguments:

`name` - The name of the command  
`description` - The description of the command  
`defaultPermission?` -  Whether the command should be enabled by default when the app is added to a guild. Defaults to `true`

> If you use this decorator, you must load the module in which the interaction is defined

## Example
```typescript
import { CustomChatInputCommand, ExtendedClient, RegisterChatInputCommand } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

@RegisterChatInputCommand("ping", "Ping the bot!")
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