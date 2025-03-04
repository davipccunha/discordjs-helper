---
title: RegisterSelectMenu
---

# `@RegisterSelectMenu`
## About
The `@RegisterSelectMenu` decorator is applied to a class implementing the [CustomSelectMenuInteraction](../../interfaces/custom-select-menu-interaction) interface. It registers the select menu to the cache and listens for select menu submit interactions with the same id.

It takes one argument:

`name` - The id of the select menu  

> If you use this decorator, you must load the module in which the interaction is defined

## Example
```typescript
import { CustomSelectMenuInteraction, ExtendedClient, RegisterSelectMenu } from "@davipccunha/discordjs-helper";
import { StringSelectMenuInteraction } from "discord.js";

@RegisterSelectMenu("select")
export class SelectSelectMenu implements CustomSelectMenuInteraction {
    name!: string;

    async execute(interaction: StringSelectMenuInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(`Selection selected`);
    }
}
```