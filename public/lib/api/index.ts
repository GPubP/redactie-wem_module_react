import Core from '@redactie/redactie-core';

import * as API from './api';

export const registerEventsModule = (): void => {
	Core.modules.exposeModuleApi('events-module', API);
};

export { API };
