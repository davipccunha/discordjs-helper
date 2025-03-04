---
title: CustomModalInteraction
---

# `CustomModalInteraction`
## About
The `CustomModalInteraction` interface defines a modal interaction. Classes implementing it must have:

`readonly name: string` - The id of the modal  
`execute(interaction: ModalSubmitInteraction, client: ExtendedClient): Promise<void>` - The function to be executed when a modal submit interaction with the same id as the class' attribute `name` is sent

> This class only defines the interaction. It does not register nor load it.  
> *See [@RegisterModal](../decorators/registers/register-modal) and [ExtendedClient#registerModals()](../classes/extended-client#registermodals)*

## Example
```typescript
import { CustomModalInteraction, ExtendedClient } from "@davipccunha/discordjs-helper";
import { ModalSubmitInteraction } from "discord.js";

export class ModalModal implements CustomModalInteraction {
    name: string;

    constructor() {
        this.name = "modal";
    }
    
    async execute(interaction: ModalSubmitInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(`Modal submitted!`).catch(console.error);
    }
}
```