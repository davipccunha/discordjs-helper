---
title: ExtendedClient
---

# `ExtendedClient`
`ExtendedClient` is a class that extends the normal Discord Client and add new methods to register interactions more easily

### constructor()
`constructor(token: string): ExtendedClient`

#### Parameters
`token: string` - The bot token



### registerCommands()
`registerCommands(...commands: CustomCommandInteraction<CommandInteraction>[]): Promise<void>`  
Caches the commands to respond to their interactions once they are triggered.  

#### Parameters
`commands: CustomCommandInteraction<CommandInteraction>[]` - The commands instances to register

> This method is intended for JavaScript users. TypeScript users should use the decorator `@Register...Command` instead  
> *See [@RegisterChatInputCommand](../decorators/register-chat-input-command.md)*

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { LengthCommand } from "./interactions/commands/LengthCommand";
import { GetIDCommand } from "./interactions/commands/GetIDCommand";
import { PingCommand } from "./interactions/commands/PingCommand";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerCommands(new PingCommand(), new LengthCommand(), new GetIDCommand());
```



### start()
`start(autoRegisterInteractions: boolean): Promise<void>`  
Logs the bot, registers the interactions and starts listening for interactions creation.  

#### Parameters
`autoRegisterInteractions: boolean` - Wether or not the library should automatically register interactions decorated with [@Register...](../category/registers)  
> `autoRegisterInteractions` should be set to false if you are not using TS or not using the decorators to register the interactions

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
const client = new ExtendedClient("TOKEN GOES HERE");

client.start();
```



### loadCommands()
`loadCommands(...guildIDs: string[]): Promise<void>`  
Creates the registered commands in the specified guilds.  

#### Parameters
`...guildIDs: string` - IDs of the guilds to create the commands in. Defaults to all guilds the bot is in  

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { LengthCommand } from "./interactions/commands/LengthCommand";
import { GetIDCommand } from "./interactions/commands/GetIDCommand";
import { PingCommand } from "./interactions/commands/PingCommand";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerCommands(new PingCommand(), new LengthCommand(), new GetIDCommand());
client.loadCommands();
```

> This method should be called only after the interactions are registered and the client is started



### asMember()
`asMember(guildID: string): Promise<GuildMember | null>`  
Returns the member object representing the bot in the specified guild

#### Parameters
`guildID: string` - The ID of the guild to get the bot representation for

Returns `null` if the bot's member representation could not be found

#### Example
```typescript
import { CustomChatInputCommand, ExtendedClient, RegisterChatInputCommand, RequireMemberPermission } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

@RegisterChatInputCommand("info", "Tag the bot")
@RequireMemberPermission(PermissionFlagsBits.Administrator)
export class InfoCommand implements CustomChatInputCommand {
    name!: string;
    description!: string;
    type!: ApplicationCommandType.ChatInput;
    defaultPermission!: boolean;

    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        if (!interaction.guildId) return;

        const member = await client.asMember(interaction.guildId);
        if (!member) return;

        await interaction.reply(member.toString()).catch(console.error);
    }
}
```

> This method should be called after the client is ready and the application must have members intent enabled



### deleteCommands()
`deleteCommands(commandsNames: string[], guildIDs: string[] = []): Promise<void>`  
Deletes the specified commands in the specified guilds

#### Parameters
`commandsNames: string[]` - The names of the commands to be deleted  
`guildIDs?: string[]` The guild IDs to delete the commands from. Defaults to all guilds the bot is in.  

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";

const client = new ExtendedClient("TOKEN GOES HERE");

client.once('ready', () => {
    client.deleteCommands(['ping']);
})
```