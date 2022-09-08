import { someFunction } from './someFunction';

export interface BoilerplateAPI {
	someFunction: typeof someFunction;
}
