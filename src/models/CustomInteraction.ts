import { ButtonInteraction, CommandInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { ExtendedClient } from "./ExtendedClient";

export type CustomInteractionType =
    CommandInteraction
    | ButtonInteraction
    | StringSelectMenuInteraction
    | ModalSubmitInteraction;

export interface CustomInteraction<T extends CustomInteractionType> {
    readonly name: string;
    execute: (interaction: T, client: ExtendedClient) => Promise<void>;
}