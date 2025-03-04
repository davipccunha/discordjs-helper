---
title: CustomCommandInteraction
---

# `CustomCommandInteraction`
## About
The `CustomCommandInteraction<K extends CommandInteraction>` interface defines a command interaction. Classes implementing it must have:

`readonly name: string` - The name of the command  
`readonly type: ApplicationCommandType` - The type of the command  
`readonly defaultPermission: boolean` - Wether or not this command should be available to new guilds  
`execute(interaction: K, client: ExtendedClient): Promise<void>` - The function to be executed when a command interaction with the same id as the class' attribute `name` is sent  

> This interface should not be directly implemented. It is extended by [CustomChatInputCommand](./custom-chat-input-command.md), [CustomMessageCommand](./custom-message-command.md), [CustomUserCommand](./custom-user-command.md)