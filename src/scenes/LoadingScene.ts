import { BitmapFont, BitmapText, Container } from "pixi.js";
import { IScene } from "./IScene";
import { Manager } from "../Manager";

export class LoadingScene extends Container implements IScene {

	constructor(){
		super();
		BitmapFont.from("comic 32", {
			fill: "#ffffff",
			fontFamily: "Comic Sans MS",
			fontSize: 60
		});
        
		// Bitmap font has only letters and numbers.
		const bitmapTexty: BitmapText = new BitmapText("Game is loading",
			{
				fontName: "comic 32"
			});
		bitmapTexty.anchor.set(0.5);
		bitmapTexty.position.set(Manager.width/2, Manager.height/2);

        
		this.addChild(bitmapTexty);
	}
	update(framesPassed: number): void {
		//throw new Error("Method not implemented.");
	}
	OnAssetsLoaded(): void {
		//throw new Error("Method not implemented.");
	}
	assetBundles: string[];
}