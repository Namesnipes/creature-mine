export class DataHandler {
	//TODO: inventory saving feature (dont use a new key for each jar)
	private static SAVE_DATA_INTERVAL = 30000;
	private VALIDATORS: ((value: string | number) => string | number)[] 
		= [this.NumberDataValidator,this.NumberDataValidator,this.NumberDataValidator,this.NumberDataValidator];
	private static DATA_KEYS: string[] 
		= ["honey","regular_jars","starberry_jars","blueberry_jars"];
	private dataValues: (string | number)[]
		= [0, 0,0,0];

	constructor() {
		const tempData = localStorage.getItem("IdleGameData");
		if (tempData != null && tempData.length > 1) {
			this.LoadData(tempData);
		} else {
			console.log("User has no previous data!");
		}

		setInterval(() => {
			this.SaveData();
		}, DataHandler.SAVE_DATA_INTERVAL);
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
	 * Retrieves an array of all the jar keys from the DataHandler.DATA_KEYS. THIS IS TEMPORARY PLEASE DONT USE THIS LATER
	 *
	 * @return {string[]} An array of strings representing the data keys for jars
	 */
	public GetJarKeys(): string[]{
		const keys: string[] = [];
		for (let index = 0; index < DataHandler.DATA_KEYS.length; index++) {
			if(DataHandler.DATA_KEYS[index].includes("jar")){
				keys.push(DataHandler.DATA_KEYS[index]);
			}
		}
		return keys;
	}

	/**
     * Saves all game data by storing it in the browsers local storage.
     *
     * @return {void}
     */
	private SaveData(): void {
		console.log("saved data");
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
					if(DataHandler.DATA_KEYS[i] == null){
						throw new Error("Tried to access data at index " + i + " but no key exists for it");
					}
					throw new Error("Data validator not found for key:" + DataHandler.DATA_KEYS[i] + " at index " + i);
				}
			}
		}
		console.log("All data for this session: ",this.dataValues, DataHandler.DATA_KEYS);
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