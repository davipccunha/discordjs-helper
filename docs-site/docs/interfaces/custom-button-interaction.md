---
title: CustomButtonInteraction
---

# `CustomButtonInteraction`
## About
The `CustomButtonInteraction` interface defines a button interaction. Classes implementing it must have:

`readonly name: string` - The id of the button  
`execute(interaction: ButtonInteraction, client: ExtendedClient): Promise<void>` - The function to be executed when a button interaction with the same id as the class' attribute `name` is sent

> This class only defines the interaction. It does not register nor load it.  
> *See [@RegisterButton](../decorators/registers/register-button) and [ExtendedClient#registerButtons()](../classes/extended-client#registerbuttons)*

## Example
```typescript
import { CustomButtonInteraction, ExtendedClient } from "@davipccunha/discordjs-helper";
import { ButtonInteraction } from "discord.js";

export class ButtonButton implements CustomButtonInteraction {
    name: string;

    constructor() {
        this.name = "button";
    }

    async execute(interaction: ButtonInteraction, client?: ExtendedClient): Promise<void> {
        await interaction.reply("Button clicked!");
    }
}
```