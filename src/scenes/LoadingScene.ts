import { BitmapFont, BitmapText, Container } from "pixi.js";
import { IScene } from "./IScene";
import { Manager } from "../Manager";
import { Helper } from "../Helper";

export class LoadingScene extends Container implements IScene {

	private LoadingText: BitmapText;
	constructor(){
		super();
		BitmapFont.from("comic 32", {
			fill: "#ffffff",
			fontFamily: "Comic Sans MS",
			fontSize: 60
		});
        
		// Bitmap font has only letters and numbers.
		this.LoadingText = new BitmapText("Loading 0",
			{
				fontName: "comic 32"
			});
		this.LoadingText.anchor.set(0.5);
		this.LoadingText.position.set(Manager.width/2, Manager.height/2);

        
		this.addChild(this.LoadingText);
	}
	update(framesPassed: number): void {
	}
	OnAssetsLoaded(): void {
	}

	testcallback(percent: number): void {
		const roundedPercent = Helper.RoundToNDecimalPlaces(percent, 2) * 100;
		if(this.LoadingText){
			this.LoadingText.text = "Loading " + roundedPercent + "%";
		}
	}
	assetBundles: string[];
}