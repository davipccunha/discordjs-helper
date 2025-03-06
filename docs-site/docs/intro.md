---
sidebar_position: 1
---

# Introduction
## About
discordjs-helper is a library that extends the discordjs npm library and allows you to more easily create and register interactions to the Discord API. It is mostly helpful for TypeScript users. It adds types and interfaces for type safety, decorators to more easily do repetitive tasks and functions that enhance some of discordjs functionalities. This Introduction will guide you through the most useful features and how to use them.

___

## ExtendedClient
[ExtendedClient](./classes/extended-client.md) is the main class of the library. It extends the normal discordjs [Client](https://discord.js.org/docs/packages/discord.js/14.18.0/Client:Class) by adding some useful attributes, methods and implicitly running some common tasks so you don't have to do it each time.  
It should be instantiated in your main file, passing the bot's token as argument.
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";

const client = new ExtendedClient("TOKEN GOES HERE");
```

___

## Interfaces
One of the main features of the discordjs-helper module is interfaces. [Interfaces](./category/interfaces) define a model for classes that implement them, ensuring type safety and making the code less prone to errors. It is mainly used for defining how interactions, such as commands, should behave. Let's see [CustomChatInputCommand](./interfaces/custom-chat-input-command.md) as example.
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

This defines a text chat input command. By implementing the [CustomChatInputCommand](./interfaces/custom-chat-input-command.md) interface, we ensure that the _PingCommand_ class has all the necessary attributes and methods to properly define a command.

___

## Decorators
Another useful feature that this module implements are decorators. [Decorators](./category/decorators) are special functions that can modify the behavior of classes, functions, variables, etc.. All decorators in this module are applied to classes. They are used to simplify and reuse code that can become very repetitive.

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

[@RegisterChatInputCommand](./decorators/registers/register-chat-input-command.md) automatically caches the command and executes the class' `execute` method when a chat input command with the same name as the class' is created. It should only be applied to classes that implement [CustomChatInputCommand](./interfaces/custom-chat-input-command.md).  
> Classes decorated with [RegisterChatInputCommand](./decorators/registers/register-chat-input-command.md) must have their module loaded/imported somewhere in the main code.

[@RequireMemberPermission](./decorators/permission/require-member-pemission.md) implicitly checks for user's permission in the guild scope, and only executes the command if the user who triggered its interaction has Administrator permission guild-wise.

___

## Extensions
[Type extensions](./category/extensions) are the way discordjs-helper extends pre-existing classes and adds helpful methods to them. They usually implement common utility codes such as _BaseInteraction#replyOrFollowUp()_ and _StringSelectMenuInteraction#clearSelection()_. Refer to [Extensions](./category/extensions) for examples.

___

## Examples
`src/interactions/commands/PingCommand.ts`
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
`src/index.ts`
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { PingCommand } from "./interactions/commands/PingCommand.js";

const client = new ExtendedClient("TOKEN GOES HERE");

new PingCommand();

client.start();
client.loadCommands();
```
**The two snippets above exemplify all there is to get your first command working.**  
Alternatively, you can dynamically import the files in which you've defined your interactions. For example, the code below recursively imports all files inside the folder `/interactions/`. Hence, to create new interactions all you have to do is create the interaction class, decorate it with `@Register...`, rebuild and restart the application.

`src/index.ts`
```typescript
import { ExtendedClient, recursiveFiles } from "@davipccunha/discordjs-helper";
import path from 'path';
import { pathToFileURL } from 'url';

// Instantiate the client
const client = new ExtendedClient("TOKEN GOES HERE");

await registerInteractions();

// Starts the bot
client.start();

// Loads cached commands to all guilds the bot is in
client.loadCommands();

// This function recursively retrieves all files that are in the /interactions/ folder and imports them
// Essentially this loads all modules with interactions defined so they get correctly registered
// This is useful because creating a new interaction, decorated with @Register..., inside the /interactions/ folder, is all there is to get a new interaction working
async function registerInteractions() {
    const interactions = await recursiveFiles("dist/interactions");
    for (const interaction of interactions) {
        const fileName = interaction.replaceAll('\\', '/');
        const absolutePath = path.resolve(fileName);

        const fileUrl = pathToFileURL(absolutePath).href;

        await import(fileUrl);
    }
};
```
