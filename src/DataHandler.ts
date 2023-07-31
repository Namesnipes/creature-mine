export class DataHandler {

	private VALIDATORS: ((value: string | number) => string | number)[] 
		= [this.NumberDataValidator,this.NumberDataValidator];
	private static DATA_KEYS: string[] 
		= ["honey","jars"];
	private dataValues: (string | number)[]
		= [0, 0];

	constructor() {
		const tempData = localStorage.getItem("IdleGameData");
		if (tempData != null && tempData.length > 1) {
			this.LoadData(tempData);
		} else {
			console.log("User has no previous data!");
		}
	}

	/**
 * Stores data for a given key.
 *
 * @param {string} key - The key to set the data for.
 *                      The key name must be defined in DataHandler.DATA_KEYS before it can be used.
 * @param {string | number} data - The data to store.
 * @return {void}
 */
	public SetData(key: string, data: string | number): void {

		if (typeof data === 'string' && data.includes('|')) {
			throw new Error('Data cannot contain the "|" character');
		}

		const index: number = this.getDataIndex(key);
		const validator = this.VALIDATORS[index];
		this.dataValues[index] = validator(data);
		//TODO: PLEASE ADD A SAVING INTERVAL LIKE 30 SEC?? What is this shit
		if(Math.random() < 0.1)this.SaveData();
	}
  

	/**
     * Retrieves data associated with the given key. The key name must be defined in DataHandler.DATA_KEYS before it can be used.
     *
     * @param {string} key - The key of the data to be retrieved.
     * @return {string | number} The value associated with the given key, or null if the key does not exist.
     */
	public GetData(key: string): number | string {
		const index: number = this.getDataIndex(key);
		const validator = this.VALIDATORS[index];
		const data = this.dataValues[index];
		return validator(data);
	}

	/**
     * Saves all game data by storing it in the browsers local storage.
     *
     * @return {void}
     */
	private SaveData(): void {
		let tempSaveString: string = "";
		for (let i = 0; i < this.dataValues.length; i++) {
			let value = this.dataValues[i];
			if (typeof value === 'number'){
				value = Math.round(<number>value); // unfortunately you will lose your 0.001 nectar on save
			}
			tempSaveString += <string>value + "|";
		}
		console.log("Saving data:", tempSaveString);
		const encodedData = this.StringToBase64(tempSaveString);
		localStorage.setItem("IdleGameData", encodedData);
	}


	/**
     * Parses encoded data from local storage and loads it into the data array.
     *
     * @param {string} encodedData - The encoded data to be loaded.
     * @return {void}
     */
	private LoadData(encodedData: string): void {
		const decodedData = this.Base64ToString(encodedData);
		const data: string[] = decodedData.split("|");

		for (let i = 0; i < data.length; i++) {
			if (data[i] !== "") {
				const validator = this.VALIDATORS[i];
				let parsedData: number|string;

				if (validator != null) {
					parsedData = validator(data[i]);
					this.dataValues[i] = parsedData;
				} else {
					throw new Error("Data validator not found for key:" + DataHandler.DATA_KEYS[i]);
				}
			}
		}
		console.log("All data for this session: ",this.dataValues);
	}

	private StringToBase64(str: string): string {
		const bytes: Uint8Array = new TextEncoder().encode(str);
		const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
		return btoa(binString);
	}

	private Base64ToString(base64: string): string {
		const binaryString = atob(base64);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return new TextDecoder().decode(bytes);
	}

	private getDataIndex(key: string): number {
		const dataIndex: number = DataHandler.DATA_KEYS.indexOf(key);
		if (dataIndex === -1) {
			throw new Error('Key does not exist: ' + key);
		}
		return dataIndex;
	}

	private NumberDataValidator(value: string | number): number {
		const data: number = Number(value);
		if(!Number.isNaN(data)) {
			return data;
		} else {
			throw new Error("Data is not a number: " + value);
		}
	}
}