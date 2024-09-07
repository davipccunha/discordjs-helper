import { ButtonInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";
import { ExtendedClient } from "./ExtendedClient";

export interface CustomButtonInteraction extends CustomInteraction<ButtonInteraction> {
    execute(interaction: ButtonInteraction, client: ExtendedClient): Promise<void>;
}