import { FormsAPI } from '@redactie/form-renderer-module';
declare class FormRendererConnector {
    apiName: string;
    api: FormsAPI;
    constructor();
}
declare const formRendererConnector: FormRendererConnector;
export default formRendererConnector;
