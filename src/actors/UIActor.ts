import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Graphics, Container, Sprite, Texture, Text, TextStyle } from 'pixi.js';
import { Manager } from '../Manager';
import { Helper } from '../Helper';
export class UIActor extends Actor {
	private UIWidth: number;
	mHoneyEmptyLevel: number = Texture.from('honey').height + Texture.from('honey').height/2 + 10;
	mHoneyFullLevel: number = Texture.from('honey').height - Texture.from('honey').height/2 + 8;
	private readonly MAXHONEY = 300;
	mHoneyMask: Graphics;
	mTextStyle = new TextStyle({
		fontFamily: "Comic Sans MS",
		fontSize: 32,
		miterLimit: 0,
		stroke: "#ffd219",
		strokeThickness: 3
	});
	mJarsText = new Text('Jars:', this.mTextStyle);
	mHoneyCount = new Text('Honey:', this.mTextStyle);
	constructor(scene: Scene, width: number) {
		super(scene);
		this.UIWidth = width;
		this.MakeUI();
	}
	/**
     * Draws the UI panel.
     *
     * @private
     * @returns {void}
     */
	private MakeUI(): void{
		const uiContainer = new Container();
		//mask shape for ui container
		const baseGraphics = new Graphics();
		baseGraphics.beginFill(0xffffff);
		const uiBase = baseGraphics.drawRect(0, 0, this.UIWidth, Manager.height);
		baseGraphics.endFill();
		uiContainer.mask = uiBase;
		//wooden bg
		const uiBg = Sprite.from("wood");
		uiBg.scale.set(0.52, 1);
		uiBg.anchor.set(0.5);
		uiContainer.addChild(uiBg);
		//honey jar base (glass)
		const honeyJar = Sprite.from("jar");
		honeyJar.anchor.set(0.5);
		uiContainer.addChild(honeyJar);
		honeyJar.position.set(this.UIWidth/2, Manager.height/4);
		//shelf
		const woodShelf = Sprite.from("wood_shelf");
		woodShelf.anchor.set(0.5);
		woodShelf.scale.set(0.9, 1);
		uiContainer.addChild(woodShelf);
		woodShelf.position.set(this.UIWidth/2, Manager.height/4 + Texture.from("jar").height/2 + woodShelf.height/2);
		//honey mask
		const honeyContainer = new Container();
		const honeyMaskGraphics = new Graphics();
		honeyMaskGraphics.beginFill(0x650A5A);
		//TODO: set mask to size of jar- need to load sprite assets to be able to get value first
		//begin with low y, move up gradually
		this.mHoneyMask = honeyMaskGraphics.drawRect(this.UIWidth/2 - Texture.from("honey").width/2,
			this.mHoneyEmptyLevel, Texture.from("honey").width, Texture.from("honey").height);
		honeyMaskGraphics.endFill();
		honeyContainer.addChild(this.mHoneyMask);
		honeyContainer.mask = this.mHoneyMask;

		const honey = Sprite.from("honey");
		honey.anchor.set(0.5);
		//TODO: fix hardcoded honey height
		honey.position.set(this.UIWidth/2, Manager.height/4 + 18);
		honeyContainer.addChild(honey);

		uiContainer.addChild(honeyContainer);

		//text
		this.mJarsText.anchor.set(0.5);
		this.mJarsText.position.set(this.UIWidth/2, Manager.height/2);
		uiContainer.addChild(this.mJarsText);
		this.mHoneyCount.anchor.set(0.5);
		this.mHoneyCount.position.set(this.UIWidth/2, Manager.height/4);
		uiContainer.addChild(this.mHoneyCount);

		this.mScene.addChild(uiContainer);
	}
	public override OnUpdate(): void {
		//update honey jar to match honey count
		//get honey count and set mask pos accordingly
		const currentHoney: number = <number>Manager.dataHandler.GetData("honey");
		const currentHoneyDisplay: string = Helper.FormatNumberForDisplay(currentHoney);
		const currentJars: number = <number>Manager.dataHandler.GetData("jars");
		const honeyLevel = currentHoney/this.mHoneyFullLevel;
		this.mHoneyMask.y = (this.mHoneyFullLevel * (honeyLevel*-1))/1.18;
		if(currentHoney >= this.MAXHONEY){
			Manager.dataHandler.SetData("jars", (currentJars + 1) as number);
			Manager.dataHandler.SetData("honey", (0) as number);
			this.mHoneyMask.y = this.mHoneyEmptyLevel;
		}
		//set text
		this.mHoneyCount.text = 'Honey: ' + currentHoneyDisplay;
		this.mJarsText.text = 'Jars: ' + currentJars;


		
	}
    

}