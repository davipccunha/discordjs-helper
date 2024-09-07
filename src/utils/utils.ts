import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { BaseInteraction, InteractionReplyOptions, InteractionResponse, Message } from 'discord.js';

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets all files in a directory and its subdirectories.
 * @param rootDirectory The directory to start the search.
 * @param allFiles The initial array of files.
 * @returns An array containing all files in the directory and its subdirectories.
 */
export function recursiveFiles(rootDirectory: string, allFiles: string[] = []): Promise<string[]> {
    try {
        const filesInRoot = readdirSync(rootDirectory);
        for (const file of filesInRoot) {
            const absolute = join(rootDirectory, file);
            if (statSync(absolute).isDirectory()) {
                recursiveFiles(absolute, allFiles);
            } else {
                allFiles.push(absolute);
            }
        }
    } catch (err) {
        console.error(err);
    }

    return new Promise(resolve => {
        resolve(allFiles);
    });
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