---
title: BaseInteraction
---

# `BaseInteraction Extensions`
The following methods have been added to the discordjs BaseInteraction.prototype:

### replyOrFollowUp()
`replyOrFollowUp(reply: InteractionReplyOptions): Promise<Message<boolean>> | Promise<InteractionResponse<boolean>>`  
Replies to an interaction or follows up if already replied or deferred, avoiding "Interaction Already Acknowledged" error.  

#### Parameters
`reply: InteractionReplyOptions` - The reply to be sent  

Returns InteractionResponse, if followed up, or Message, if replied.

#### Example
```ts
import { CustomButtonInteraction, ExtendedClient, RegisterButton } from "@davipccunha/discordjs-helper";
import { ButtonInteraction } from "discord.js";

@RegisterButton("button")
export class ButtonButton implements CustomButtonInteraction {
    name!: string;

    async execute(interaction: ButtonInteraction, client: ExtendedClient): Promise<void> {
        const condition = Math.random() > 0.5;
        if (condition) {
            await interaction.reply("Lucky!").catch(console.error);
        };

        await interaction.replyOrFollowUp("Button clicked").catch(console.error);
    }
}
```

> If the condition evaluates to `true` and you call `interaction.reply("Button clicked")`, you get an "Interaction Already Acknowledged" error.  
> If the condition evaluates to `false` and tou call `interaction.followUp("Button clicked")`, an error is also thrown.