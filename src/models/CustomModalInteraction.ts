import { ModalSubmitInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";

export interface CustomModalInteraction extends CustomInteraction<ModalSubmitInteraction> {
    // This is empty because currently only an id (name) and the function to execute (execute()) are needed to define this interaction 
}