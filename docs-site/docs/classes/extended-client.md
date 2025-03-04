---
title: ExtendedClient
---

# `ExtendedClient`
`ExtendedClient` is a class that extends the normal Discord Client and add new methods to register interactions more easily

### constructor()
`constructor(token: string): ExtendedClient`

#### Parameters
`token: string` - The bot token

___

### registerCommands()
`registerCommands(...commands: CustomCommandInteraction<CommandInteraction>[]): Promise<void>`  
Caches the commands to respond to their interactions once they are created.  

> CustomCommandInteraction&lt;CommandInteraction> is the same as ([CustomChatInputCommand](./custom-chat-input-command.md) | [CustomMessageCommand](./custom-message-command.md) | [CustomUserCommand](./custom-user-command.md))  
*See [CustomCommandInteraction](../interfaces/custom-command-interaction.md)*

> This method is intended for JavaScript users. TypeScript users should use the decorator `@Register...Command` instead  
> *See [@RegisterChatInputCommand](../decorators/registers/register-chat-input-command.md)*

#### Parameters
`...commands: CustomCommandInteraction<CommandInteraction>` - The custom commands instances to register

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { LengthCommand } from "./interactions/commands/LengthCommand";
import { GetIDCommand } from "./interactions/commands/GetIDCommand";
import { PingCommand } from "./interactions/commands/PingCommand";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerCommands(new PingCommand(), new LengthCommand(), new GetIDCommand());
```

___

### registerButtons()
`registerButtons(...buttons: CustomButtonInteraction[]): Promise<void>`  
Caches the buttons to respond to their interactions once they are created.

> This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterButton` instead  
> *See [@RegisterButton](../decorators/registers/register-button.md)*

#### Parameters
`...buttons: CustomButtonInteraction` - The custom buttons interactions instances to register

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { ButtonButton } from "./interactions/buttons/ButtonButton";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerButtons(new ButtonButton());
```

___

### registerModals()
`registerModals(...modals: CustomModalInteraction[]): Promise<void>`  
Caches the modals to respond to modal submit interactions once they are created.

> This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterModal` instead  
> *See [@RegisterModal](../decorators/registers/register-modal.md)*

#### Parameters
`...modals: CustomModalInteraction` - The custom modals interactions instances to register

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { ModalModal } from "./interactions/modals/ModalModal";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerModals(new ModalModal());
```

___

### registerSelectMenus()
`registerSelectMenus(...selectMenus: CustomSelectMenuInteraction[]): Promise<void>`  
Caches the select menus to respond to select menu submit interactions once they are created.

> This method is intended for JavaScript users. TypeScript users should use the decorator `@RegisterSelectMenu` instead  
> *See [@RegisterSelectMenu](../decorators/registers/register-select-menu.md)*

#### Parameters
`...selectMenus: CustomSelectMenuInteraction` - The custom select menus interactions instances to register

#### Example
```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { SelectSelectMenu } from "./interactions/selectMenus/SelectSelectMenu";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerSelectMenus(new SelectSelectMenu());
```

___

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

___

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

___

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

___

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