import { extendTypes } from './utils/utils';

// REVIEW: Is this the proper way of extending types?
extendTypes();

import * as types from '../typings/index';
export type { types };

export * from './models/CustomButtonInteraction';
export * from './models/CustomCommandInteraction';
export * from './models/CustomInteraction';
export * from './models/CustomModalInteraction';
export * from './models/CustomSelectMenuInteraction';
export * from './models/ErrorMessages';
export * from './models/ExtendedClient';

export * from './utils/utils';
export * from './utils/builders/MessageEmbedBuilder';
export * from './utils/decorators/NoReplyInteraction';
export * from './utils/decorators/RequirePermission';
export { RegisterCommandInteraction } from './utils/decorators/RegisterCommandInteraction';
export { RegisterButtonInteraction } from './utils/decorators/RegisterButtonInteraction';
export { RegisterSelectMenuInteraction } from './utils/decorators/RegisterSelectMenuInteraction';
export { RegisterModalInteraction } from './utils/decorators/RegisterModalInteraction';