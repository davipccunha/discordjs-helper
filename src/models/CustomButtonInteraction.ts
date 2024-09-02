import { ButtonInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";

export interface CustomButtonInteraction extends CustomInteraction<ButtonInteraction> {
    // This is empty because currently only an id (name) and the function to execute (execute()) are needed to define this interaction 
}