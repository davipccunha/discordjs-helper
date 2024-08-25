import { extendTypes } from './utils/utils';

// REVIEW: Is this the proper way of extending types?
extendTypes();

import * as types from '../typings/index';
export type { types };

export * from './models/CustomButtonInteraction';
export * from './models/CustomCommand';
export * from './models/CustomInteraction';
export * from './models/CustomModalInteraction';
export * from './models/CustomSelectMenuInteraction';
export * from './models/DiscordEvent';
export * from './models/ExtendedClient';

export * from './utils/utils';
export * from './utils/builders/MessageEmbedBuilder';
export * from './utils/decorators/NoReplyInteraction';
export * from './utils/decorators/RequirePermission';