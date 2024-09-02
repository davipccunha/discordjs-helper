import { StringSelectMenuInteraction } from "discord.js";
import { CustomInteraction } from "./CustomInteraction";

export interface CustomSelectMenuInteraction extends CustomInteraction<StringSelectMenuInteraction> {
// This is empty because currently only an id (name) and the function to execute (execute()) are needed to define this interaction 
}