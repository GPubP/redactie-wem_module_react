/**
 * @module Module API
 */
import Core from '@redactie/redactie-core';

import { MODULE_NAME } from '../boilerplate.const';

import * as API from './api';

Core.modules.exposeModuleApi(`${MODULE_NAME}-module`, API);

export { API };
