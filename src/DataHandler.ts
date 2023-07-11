export class DataHandler{
    private data: any[] = []

    constructor(){
        let temp_data = localStorage.getItem("IdleGameData")
        if(temp_data != null && temp_data.length > 1){
            this.loadData(temp_data)
        }
    }

    /**
     * Saves all game data by storing it in the browsers local storage.
     *
     * @return {void}
     */
    public saveData(): void{
        let temp_save_string : string = ""
        for(let i = 0; i < this.data.length; i++){
            temp_save_string += this.data[i] + "|"
        }
        console.log("Saving data:", temp_save_string)
        localStorage.setItem("IdleGameData", this.stringToBase64(temp_save_string))
    }

 
    /**
     * Parses encoded data from local storage and loads it into the data array.
     *
     * @param {string} encoded_data - The encoded data to be loaded.
     * @return {void}
     */
    private loadData(encoded_data: string): void{
        let str = this.base64ToString(encoded_data)
        let data: string[] = str.split("|")
        for(let i = 0; i < data.length; i++){
            if(data[i] != ""){
                this.data.push(data[i])
                console.log("Loading", data[i])
            }
        }
    }

    private stringToBase64(str: string): string {
        const bytes: Uint8Array = new TextEncoder().encode(str)
        const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
        return btoa(binString);
      }
    
    private base64ToString(base64: string): string {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    }

    /**
     * Sets the number of clicks.
     *
     * @param {number} clicks - The number of clicks.
     * @return {void}
     */
    public setClicks(clicks: number) : void{
        if(clicks > 0){
            this.data[0] = clicks
            this.saveData()
        }
    }

    public getClicks(): number{
        let temp = this.data[0]
        if(temp){
            return temp
        } else {
            this.setClicks(0)
            return 0
        }
    }
}