import { StringSelectMenuInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";
import { ExtendedClient } from "./ExtendedClient";

export interface CustomSelectMenuInteraction extends CustomInteraction<StringSelectMenuInteraction> {
    execute(interaction: StringSelectMenuInteraction, client: ExtendedClient): Promise<void>;
}