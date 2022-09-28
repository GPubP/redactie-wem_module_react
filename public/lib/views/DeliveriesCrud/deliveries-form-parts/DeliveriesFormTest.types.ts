interface JSONInputErrorObject {
	token: number;
	line: number;
	reason: string;
}

export interface JSONInputOnChangeValue {
	json: string;
	error: boolean | JSONInputErrorObject;
}
