---
title: NumberCommandOption
---

# `NumberCommandOption`
## About
Defines attributes of a number option for chat input commands

`name: string` - The name of the option  
`description: string` - The description of the option  
`type: ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number` - The type of the option    
`required?: boolean` - Wether the option is required or not  
`choices?: ApplicationCommandOptionChoiceData[]` - Choices for options that have predefined options to choose from > *See [ApplicationCommandOptionChoiceData](https://discord.js.org/docs/packages/discord.js/14.18.0/ApplicationCommandOptionChoiceData:Interface)*   
`options?: CommandOption[]` - Sub-options for the option  
`minValue?: number` - The minimum value accepted as input  
`maxValue?: number` - The maximum value accepted as input  
> *See [CommandOption](../types/command-option.md)*

## Example
```typescript
import { NumberCommandOption } from "@davipccunha/discordjs-helper";
import { ApplicationCommandOptionType } from "discord.js";

const numberOption: NumberCommandOption = {
    name: "number",
    description: "A number",
    type: ApplicationCommandOptionType.Number,
    required: true,
    minValue: 0,
    maxValue: 100
};
```