import { BehaviorSubject } from 'rxjs';
export declare class Translations {
    moduleTranslationsLoaded: BehaviorSubject<boolean>;
    registerTranslations(): void;
}
export declare const translations: Translations;
