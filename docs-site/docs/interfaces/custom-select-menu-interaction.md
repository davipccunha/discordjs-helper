---
title: CustomSelectMenuInteraction
---

# `CustomSelectMenuInteraction`
## About
The `CustomSelectMenuInteraction` interface defines a select menu interaction. Classes implementing it must have:

`readonly name: string` - The id of the select menu  
`execute(interaction: StringSelectMenuInteraction, client: ExtendedClient): Promise<void>` - The function to be executed when a select menu submit interaction with the same id as the class' attribute `name` is sent

> This class only defines the interaction. It does not register nor load it.  
> *See [@RegisterSelectMenu](../decorators/registers/register-select-menu) and [ExtendedClient#registerSelectMenus()](../classes/extended-client#registerselectmenus)*

## Example
```typescript
import { CustomSelectMenuInteraction, ExtendedClient } from "@davipccunha/discordjs-helper";
import { StringSelectMenuInteraction } from "discord.js";

export class SelectSelectMenu implements CustomSelectMenuInteraction {
    name: string;

    constructor() {
        this.name = "select";
    }

    async execute(interaction: StringSelectMenuInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(`Selection selected`);
    }
}
```