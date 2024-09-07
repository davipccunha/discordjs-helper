import { InteractionReplyOptions, Message, InteractionResponse } from "discord.js";

declare global {
    interface Array<T> {
        /**
         * @returns A random element from the array.
         */
        random(): T;

        /**
         * Gets a number of random different elements from the array.
         * @param number The number of elements to draw. Defaults to 1.
         * @returns An array containing the drawn elements.
         */
        draw(number?: number): T[];
    }
}

declare module 'discord.js' {
    interface BaseInteraction {
        /**
        * Replies to an interaction or follows up if already replied or deferred, avoiding Interaction Already Acknowledged error.
        * @param reply The reply to be sent.
        * @returns InteractionResponse, if followed up, or Message, if replied.
        */
        replyOrFollowUp(reply: InteractionReplyOptions): Promise<Message<boolean>> | Promise<InteractionResponse<boolean>>;
    }
}

export { };