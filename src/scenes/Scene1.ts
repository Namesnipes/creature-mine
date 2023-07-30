import { Container, Ticker, Text, TextStyle, Sprite} from 'pixi.js';
import { Manager } from "../Manager";
import { IScene } from './IScene';
import { Actor } from '../actors/Actor';
import { HiveActor } from '../actors/HiveActor';
import { FlowerActor } from '../actors/FlowerActor';
import { UIActor } from '../actors/UIActor';
import { MoundActor } from '../actors/MoundActor';

export class Scene extends Container implements IScene {
	private readonly screenWidth: number;
	private readonly screenHeight: number;
	private readonly gameScreenWidth: number;
	private readonly gameScreenHeight: number;
	private readonly UIWIDTH: number;
	//number of frames for fps counter to update
	private readonly FPSFRAMES = 15;
	assetBundles:string[] = ["MainScreen"];
	mActors : Array<Actor> = [];
	mFPSTextStyle = new TextStyle({
		fill: "#45ff5d",
		fontSize: 41,
		fontVariant: "small-caps",
		miterLimit: 0,
		strokeThickness: 3
	});
	mFPSCount: Text = new Text('FPS: ', this.mFPSTextStyle);
	mFPSFrameCount: number = 0;
	mHive: HiveActor;
	mFlowerField: Array<FlowerActor> = [];
	mUI: UIActor;

	constructor() {
		super(); // Mandatory! This calls the superclass constructor.
		this.screenWidth = Manager.width;
		this.screenHeight = Manager.height;
		this.UIWIDTH = Manager.width/4;
		this.sortableChildren = true; // Lets zindex work
		this.gameScreenWidth = Manager.width - this.UIWIDTH;
		this.gameScreenHeight = Manager.height;
		this.mFPSCount.position.set(this.gameScreenWidth + this.UIWIDTH/2, this.screenHeight-this.mFPSCount.height);  
	}

	public OnAssetsLoaded(): void {
		this.CreateFlowerField();
		this.mHive = new HiveActor(this);
		this.mUI = new UIActor(this, this.UIWIDTH);
		this.addChild(this.mHive);
		this.addChild(this.mFPSCount);

		const bg: Sprite = Sprite.from("field_bg");
		bg.zIndex = -1;
		bg.width = Manager.width;
		bg.height = Manager.height;
		this.addChild(bg);   
	}

	/**
     * Create a flower field by generating 10 flower actors and adding them to the scene, in random locations.
     *
     * @return {void}
     */
	private CreateFlowerField(): void{
		const ROWS = 2;
		const COLS = 7;
		for(let i = 0; i < ROWS; i++){
			for(let j = 0; j< COLS; j++){
				const mound = new MoundActor(this);

				const startX = this.screenWidth - this.gameScreenWidth;
				const gapX = ((this.gameScreenWidth-mound.width)/(COLS-1));
				const startingCoordX = startX + gapX * j;

				const startY = (this.screenHeight - this.gameScreenHeight) + Manager.height/2 - mound.height/2;
				const gapY = (Manager.height/2-mound.height/2)/(ROWS-1);
				const startingCoordY = startY + gapY * i;

				mound.x = startingCoordX;
				mound.y = startingCoordY;
				this.addChild(mound);
			}
		}
	}
	public AddActor(actor: Actor): void{
		this.mActors.push(actor);
	}

	public GetActors(): Array<Actor>{
		return this.mActors;
	}
	public AddFlower(flower: FlowerActor): void{
		this.mFlowerField.push(flower);
	}
	public GetFlowers(): Array<FlowerActor>{
		return this.mFlowerField;
	}

	//process input on all actors
	private ProcessInput(): void{
		this.mActors.forEach(function(child){
			child.ProcessInput();
		});
	}
	//update input on all actors
	private UpdateActors(): void{
		this.mActors.forEach(function(child){
			child.Update(Ticker.shared.deltaMS);
		});
	}

	//update
	update(_framesPassed: number): void {
		this.ProcessInput();
		this.UpdateActors();
		//update fps counter
		this.mFPSFrameCount++;
		if(this.mFPSFrameCount == this.FPSFRAMES){
			this.mFPSCount.text = 'FPS: ' + Math.floor(Ticker.shared.FPS);
			this.mFPSFrameCount = 0;
		}
        
	}
}
