export type DiscordEvent = {
    name: string;
    execute: (...args: any[]) => void;
}