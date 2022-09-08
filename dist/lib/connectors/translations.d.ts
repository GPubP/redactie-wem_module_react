import { TranslateFunc, TranslationsAPI } from '@redactie/translations-module';
declare class TranslationsConnector {
    static apiName: string;
    private api;
    get core(): TranslationsAPI['core'];
    get modules(): TranslationsAPI['modules'];
    get CORE_TRANSLATIONS(): TranslationsAPI['core']['CORE_TRANSLATIONS'];
    constructor();
    useCoreTranslation(): [TranslateFunc];
    useModuleTranslation(): [TranslateFunc];
    moduleTranslate(key: string): string;
}
declare const translationsConnector: TranslationsConnector;
export default translationsConnector;
