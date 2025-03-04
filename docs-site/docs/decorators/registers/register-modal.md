---
title: RegisterModal
---

# `@RegisterModal`
## About
The `@RegisterModal` decorator is applied to a class implementing the [CustomModalInteraction](../../interfaces/custom-modal-interaction) interface. It registers the modal to the cache and listens for modal submit interactions with the same id.

It takes one argument:

`name` - The id of the modal  

> If you use this decorator, you must load the module in which the interaction is defined

## Example
```typescript
import { CustomModalInteraction, ExtendedClient, RegisterModal } from "@davipccunha/discordjs-helper";
import { ModalSubmitInteraction } from "discord.js";

@RegisterModal("modal")
export class ModalModal implements CustomModalInteraction {
    name!: string;

    async execute(interaction: ModalSubmitInteraction, client: ExtendedClient): Promise<void> {
        await interaction.reply(`Modal submitted!`).catch(console.error);
    }
}
```