import './lib/api';
import './lib/routes';
import { translations } from './lib/i18next';

translations.registerTranslations();

/**
 * @module Exports
 */
// Export types needed for other modules here
export * from './lib/boilerplate.types';
export * from './lib/api/api.types';
