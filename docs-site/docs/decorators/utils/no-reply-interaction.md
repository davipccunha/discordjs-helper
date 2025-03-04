---
title: NoReplyInteraction
---

# `@NoReplyInteraction`
## About
The `@NoReplyInteraction` decorator is applied to a class implementing any [CustomInteraction](../../category/interfaces) interface. Sometimes you want to do something when an interaction is created but not directly reply to it. Decorating a custom interaction class with it will defer and delete a reply, avoiding the "This interaction failed" message.  

It throws an error if applied to a class that does not have an 'execute' method.

## Example
```typescript
import { CustomButtonInteraction, ExtendedClient, NoReplyInteraction, RegisterButton } from "@davipccunha/discordjs-helper";
import { ButtonInteraction } from "discord.js";

@RegisterButton("close")
@NoReplyInteraction()
export class CloseButton implements CustomButtonInteraction {
    name!: string;

    async execute(interaction: ButtonInteraction, client: ExtendedClient): Promise<void> {
        if (!interaction.channel || !interaction.member) return;

        await interaction.channel.delete().catch(console.error);
    }
}
```