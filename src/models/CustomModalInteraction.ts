import { ModalSubmitInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";
import { ExtendedClient } from "./ExtendedClient";

export interface CustomModalInteraction extends CustomInteraction<ModalSubmitInteraction> {
    execute(interaction: ModalSubmitInteraction, client: ExtendedClient): Promise<void>;
}