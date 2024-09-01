import { BaseInteraction, InteractionReplyOptions, InteractionResponse, Message } from 'discord.js';

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// REVIEW: Should these implementations be made here?
export function extendTypes() {
    extendArray();
    extendBaseInteraction();
}

function extendArray() {
    Object.defineProperty(Array.prototype, 'random', {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        },
        writable: true,
        configurable: true,
        enumerable: false
    });
}

function extendBaseInteraction() {
    Object.defineProperty(BaseInteraction.prototype, 'replyOrFollowUp', {
        value: async function (reply: InteractionReplyOptions): Promise<Message<boolean> | InteractionResponse<boolean>> {
            if (this.replied || this.deferred) {
                return await this.followUp(reply);
            } else {
                return await this.reply(reply);
            }
        },
        writable: true,
        configurable: true,
        enumerable: false
    });
}