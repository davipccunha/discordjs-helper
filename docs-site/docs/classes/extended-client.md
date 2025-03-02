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
