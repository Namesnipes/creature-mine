export class DataHandler {

    private static DATA_KEYS: string[] = ["honey"];

    private dataValues: any[] = [];

    constructor() {
        let tempData = localStorage.getItem("IdleGameData")
        if (tempData != null && tempData.length > 1) {
            this.LoadData(tempData);
        }
    }

    /**
     * Saves all game data by storing it in the browsers local storage.
     *
     * @return {void}
     */
    public SaveData(): void {
        let tempSaveString: string = ""
        for (let i = 0; i < this.dataValues.length; i++) {
            tempSaveString += this.dataValues[i] + "|";
        }
        console.log("Saving data:", tempSaveString);
        localStorage.setItem("IdleGameData", this.StringToBase64(tempSaveString));
    }


    /**
     * Parses encoded data from local storage and loads it into the data array.
     *
     * @param {string} encodedData - The encoded data to be loaded.
     * @return {void}
     */
    private LoadData(encodedData: string): void {
        let str = this.Base64ToString(encodedData);
        let data: string[] = str.split("|");
        for (let i = 0; i < data.length; i++) {
            if (data[i] != "") {
                this.dataValues.push(data[i]);
                console.log("Loading", data[i]);
                console.log(this.dataValues);
            }
        }
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

    /**
     * Stores data for a given key.
     *
     * @param {string} key - The key to set the data for. The key name must be defined in DataHandler.DATA_KEYS before it can be used.
     * @param {string | number} data - The data to store.
     * @return {void}
     */
    public SetData(key: string, data: string | number): void {
        let dataIndex: number = DataHandler.DATA_KEYS.indexOf(key);
        if (dataIndex !== -1) {
            this.dataValues[dataIndex] = data;
            this.SaveData();
        }
    }

    /**
     * Retrieves data associated with the given key. The key name must be defined in DataHandler.DATA_KEYS before it can be used.
     *
     * @param {string} key - The key of the data to be retrieved.
     * @return {string | number} The value associated with the given key, or null if the key does not exist.
     */
    public GetNumberData(key: string): number {
        let index: number = DataHandler.DATA_KEYS.indexOf(key);
        if (index !== -1) {
            return parseInt(this.dataValues[index]);
        }
        return 0;
    }
}