<p align=”center”>
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dy/discordjs-helper">
</p>

# About
## Easily create interactions with type safety
discordjs-helper is a Node.js module written in TypeScript that allows you to more easily create and register interactions to the Discord API and discordjs library. This package contains:

- Interfaces to implement and consistently define your interactions
- Easier to use EmbedBuilder
- Decorators to help with common verifications such as users' permissions

</br>

# Installation
### Node.js and npm required!
Run into your project's terminal:
```
npm install @davipccunha/discordjs-helper
```
</br>

# Examples

## Creating a new slash command
```typescript
import { ApplicationCommandType, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import { CustomChatInputCommand, ExtendedClient, RequirePermission } from "@davipccunha/discordjs-helper";

@RequirePermission(PermissionFlagsBits.Administrator)
export class PingCommand implements CustomChatInputCommand {
    name: string;
    type: ApplicationCommandType.ChatInput;
    description: string;
    defaultPermission: boolean;

    constructor() {
        this.name = "ping";
        this.type = ApplicationCommandType.ChatInput;
        this.description = "Ping the bot!";
        this.defaultPermission = true;
    }

    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply("Pong!");
    }
}
```

## Registering slash commands
  Commands should be registered using the ExtendedClient#registerCommands() method and then sent to Discord API using ExtendedClient#loadCommands().

```typescript
import { ExtendedClient } from "@davipccunha/discordjs-helper";
import { PingCommand } from "./interactions/commands/PingCommand.js";

const client = new ExtendedClient("TOKEN GOES HERE");

client.registerCommands(new PingCommand());

client.start();

client.loadCommands("GUILD ID 1", "GUILD ID 2", "...");
```

### Together, the two code snippets above is all there is to get your first slash command working



<br>

# Reminders
You should always register all your interactions using one of the following methods in Extended Client: 
- registerCommands()
- registerButtons()
- registerSelectMenus()
- registerModals()

Then, the package handles it when an interaction is created

# Found a problem?
Please let me know of any problems found by filing an issue at [GitHub issue](https://github.com/davipccunha/discordjs-helper/issues). If you have a suggestion or just want to contact me, please send an email to davipccunha@gmail.com

# Known issues
Here is the list of already known problems that I might be working on a fix:

-

# Donations
If you are feeling generous or would like to support this and other future open-source projects, you can donate at my [Buy me a coffee](https://www.buymeacoffee.com/davipccunha) page