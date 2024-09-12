<p align=”center”>
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dy/%40davipccunha%2Fdiscordjs-helper">
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
import { CustomChatInputCommand, ExtendedClient, RegisterCommandInteraction, RequirePermission } from "@davipccunha/discordjs-helper";
import { ApplicationCommandType, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

@RegisterCommandInteraction("ping", "Ping the bot!", true, 1)
@RequireMemberPermission(PermissionFlagsBits.Administrator)
export class PingCommand implements CustomChatInputCommand {
    name!: string;
    type!: ApplicationCommandType.ChatInput;
    description!: string;
    defaultPermission!: boolean;

    async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply("Pong!").catch(console.error);
    }
}
```

The class above defines a Chat Input Command Interaction. It contains the information to create the command and a method `execute()` that is run when a command interaction with the same name as the class' attribute `name` is created on Discord.

## Registering slash commands
Commands should be either registered using the `ExtendedClient#registerCommands()` method or by decorating its class with `@RegisterCommandInteraction(name, description)` and then sent to Discord API using `ExtendedClient#loadCommands()`. Due to how Node.js loads the modules, a module that contains a command class decorated with @RegisterCommandInteraction must be imported in some point of your program

```typescript
import path from 'path';
import { pathToFileURL } from 'url';
import { ExtendedClient, recursiveFiles } from "@davipccunha/discordjs-helper";

setConstants();

const client = new ExtendedClient("TOKEN GOES HERE");

// This is necessary due to how Node.js loads and runs modules
await registerInteractions();

// This should be called after registering the commands
// This function caches the registered interactions, starts the bot and start listening for interactions being created
client.start(true);

// This function registers the cached commands to the guilds passed as parameters (it registers to all if no parameter is passed)
client.loadCommands("GUILD ID 1", "GUILD ID 2", ...);

// This code gets all files inside the dist/interactions folder and loads them so interactions decorated with @Register<Type>Interaction are correctly registered
async function registerInteractions() {
    const interactions = await recursiveFiles("dist/interactions");
    for (const interaction of interactions) {
        const fileName = interaction.replaceAll('\\', '/');
        const absolutePath = path.resolve(fileName);

        const fileUrl = pathToFileURL(absolutePath).href;

        await import(fileUrl);
    }
};

// This resets some constants such as error messages 
function setConstants() {
    ErrorMessages.NoPermission = "You don't have permission to do that";
};
```

### Together, the two code snippets above is all there is to get your first slash command working.
The example provided on how to register the commands is a simple way of loading all modules, regardless of how many interactions you have, instead of having to instantiate each one of them and pass them as parameter to the register methods
<br>

# Reminders
For interactions decorated with @Register...Interaction, the module in which they are defined must be imported somewhere in the main program due to how Node.js loads modules

You can always register all your interactions using one of the following methods in Extended Client: 
- registerCommands()
- registerButtons()
- registerSelectMenus()
- registerModals()
and passing false as argument to the ExtendedClient#start() method

Then, the package handles it when an interaction is created

# Found a problem?
Please let me know of any problems found by opening an issue at [GitHub issue](https://github.com/davipccunha/discordjs-helper/issues). If you have a suggestion or just want to contact me, please send an email to davipccunha@gmail.com

# Donations
If you are feeling generous or would like to support this and other future open-source projects, you can donate at my [Buy me a coffee](https://www.buymeacoffee.com/davipccunha) page