---
title: RegisterButton
---

# `@RegisterButton`
## About
The `@RegisterButton` decorator is applied to a class implementing the [CustomButtonInteraction](../../interfaces/custom-button-interaction) interface. It registers the button to the cache and listens for button interactions with the same id.

It takes one argument:

`name` - The id of the button  

> If you use this decorator, you must load the module in which the interaction is defined

## Example
```typescript
import { CustomButtonInteraction, ExtendedClient, RegisterButton } from "@davipccunha/discordjs-helper";
import { ButtonInteraction } from "discord.js";

@RegisterButton("button")
export class ButtonButton implements CustomButtonInteraction {
    name!: string;

    async execute(interaction: ButtonInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply("Button clicked!").catch(console.error);
    }
}
```