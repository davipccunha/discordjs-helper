---
title: RegisterChatInputCommand
---

# `@RegisterChatInputCommand`
## About
The `@RegisterChatInputCommand` decorator is applied to a class implementing the [CustomChatInputCommand](../interfaces/custom-chat-input-command) interface. It registers the command to the cache and listens for command interactions with the same name.

It takes three arguments:

`name` - The name of the command  
`description` - The description of the command  
`defaultPermission?` (Defaults to `true`) -  Whether the command should be enabled by default when the app is added to a guild

<b>If you use this decorator, you must load the module in which the interaction's is defined</b>

## Example
```typescript
import { CustomChatInputCommand, ExtendedClient, RegisterChatInputCommandInteraction } from "@davipccunha/discordjs-helper";
import { ChatInputCommandInteraction } from "discord.js";

@RegisterChatInputCommandInteraction("ping", "Ping the bot!", true)
export class PingCommand implements CustomChatInputCommand {
    name!: string;
    description!: string;
    defaultPermission!: boolean;

    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply("Pong!").catch(console.error);
    }
}
```