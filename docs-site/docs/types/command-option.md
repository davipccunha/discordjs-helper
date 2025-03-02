---
title: CommandOption
---

# `CommandOption`
## About
Defines attributes of an option for chat input commands

`name: string` - The name of the option  
`description: string` - The description of the option  
`type: ApplicationCommandOptionType` - The type of the option > *See [ApplicationCommandOptionType](https://discord.js.org/docs/packages/discord.js/14.18.0/ApplicationCommandOptionType:Enum)*  
`required?: boolean` - Wether the option is required or not  
`choices?: ApplicationCommandOptionChoiceData[]` - Choices for options that have predefined options to choose from > *See [ApplicationCommandOptionChoiceData](https://discord.js.org/docs/packages/discord.js/14.18.0/ApplicationCommandOptionChoiceData:Interface)*   
`options?: CommandOption[]` - Sub-options for the option  
> *See [NumberCommandOption](../types/number-command-option.md) and [StringCommandOption](../types/string-command-option.md)*

## Example
```typescript
import { CommandOption } from "@davipccunha/discordjs-helper";
import { ApplicationCommandOptionType } from "discord.js";

const userOption: CommandOption = {
    name: "user",
    description: "A user",
    type: ApplicationCommandOptionType.User,
    required: true
};

const economyGetOption: CommandOption = {
    name: "get",
    description: "Retrieves the user's balance",
    type: ApplicationCommandOptionType.Subcommand,
    options: [userOption]
};
```

That snippet defines a user option and a subcommand `get` that takes a user option as argument. If `economyGetOption` is passed as an option for a command called `economy`,
it will appear in Discord as `/economy get [user]`