---
title: StringSelectMenuInteraction
---

# `StringSelectMenuInteraction Extensions`
The following methods have been added to the discordjs StringSelectMenuInteraction.prototype:

### clearSelection()
`clearSelection(): Promise<void>`  
Clears the selections of a select menu.

> This method is not recommended since it resets the select menu for all users, but it is still the best way to clear the selection.

#### Example
```ts
import { CustomSelectMenuInteraction, ExtendedClient, RegisterSelectMenu } from "@davipccunha/discordjs-helper";
import { StringSelectMenuInteraction } from "discord.js";

@RegisterSelectMenu("select")
export class SelectSelectMenu implements CustomSelectMenuInteraction {
    name!: string;

    async execute(interaction: StringSelectMenuInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(`Selection selected`);
        await interaction.clearSelection();
    }
}
```