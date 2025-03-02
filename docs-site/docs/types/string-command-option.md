---
title: StringCommandOption
---

# `StringCommandOption`
## About
Defines attributes of a string option for chat input commands

`name: string` - The name of the option  
`description: string` - The description of the option  
`type: ApplicationCommandOptionType.String` - The type of the option    
`required?: boolean` - Wether the option is required or not  
`choices?: ApplicationCommandOptionChoiceData[]` - Choices for options that have predefined options to choose from > *See [ApplicationCommandOptionChoiceData](https://discord.js.org/docs/packages/discord.js/14.18.0/ApplicationCommandOptionChoiceData:Interface)*   
`options?: CommandOption[]` - Sub-options for the option  
`minLength?: number` - The minimum length for the string to be accepted as input  
`maxLength?: number` - The maximum length for the string to be accepted as input  
> *See [CommandOption](../types/command-option.md)*

## Example
```typescript
import { StringCommandOption } from "@davipccunha/discordjs-helper";
import { ApplicationCommandOptionType } from "discord.js";

const idOption: StringCommandOption = {
    name: "id",
    description: "A user id",
    type: ApplicationCommandOptionType.String,
    required: true,
    minLength: 18,
    maxLength: 19
};
```