import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Graphics, Container, Sprite, Texture, Text, TextStyle } from 'pixi.js';
import { Manager } from '../Manager';
import { Helper } from '../Helper';
import {ScrollBox } from "@pixi/ui";
import {Jar, JarType} from "./Jar";

export class UIActor extends Actor {
	private UIWidth: number;
	//TODO: fix hardcode lolzor
	mHoneyEmptyLevel: number = Texture.from('honey').height + Texture.from('honey').height/2 - 42;
	mHoneyFullLevel: number = Texture.from('honey').height - Texture.from('honey').height/2 + 12;
	private readonly MAX_HONEY = 300;
	mHoneyMask: Graphics;
	//text
	mTextStyle = new TextStyle({
		fontFamily: "Comic Sans MS",
		fontSize: 32,
		miterLimit: 0,
		stroke: "#ffd219",
		strokeThickness: 3
	});
	mJarsText = new Text('Total Jars:', this.mTextStyle);
	mHoneyCount = new Text('Honey:', this.mTextStyle);
	//default is jar inventory
	mInventoryTitle = new Text('Jars', this.mTextStyle);
	//inventories
	mInventory: ScrollBox;
	mJars: Array<Jar> = [];

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
		uiBg.scale.set(0.6, 1);
		uiContainer.addChild(uiBg);
		//honey jar base (glass)
		const honeyJar = Sprite.from("jar");
		honeyJar.anchor.set(0.5);
		uiContainer.addChild(honeyJar);
		honeyJar.position.set(this.UIWidth/2, Manager.height/5);
		//shelf
		const woodShelf = Sprite.from("wood_shelf");
		woodShelf.anchor.set(0.5);
		woodShelf.scale.set(0.9, 1);
		uiContainer.addChild(woodShelf);
		woodShelf.position.set(this.UIWidth/2, Manager.height/5 + Texture.from("jar").height/2 + woodShelf.height/2);
		//honey mask
		const honeyContainer = new Container();
		const honeyMaskGraphics = new Graphics();
		honeyMaskGraphics.beginFill(0x650A5A);
		//begin with low y, move up gradually
		this.mHoneyMask = honeyMaskGraphics.drawRect(this.UIWidth/2 - Texture.from("honey").width/2,
			this.mHoneyEmptyLevel, Texture.from("honey").width, Texture.from("honey").height);
		honeyMaskGraphics.endFill();
		honeyContainer.addChild(this.mHoneyMask);
		honeyContainer.mask = this.mHoneyMask;

		const honey = Sprite.from("honey");
		honey.anchor.set(0.5);
		//TODO: fix hardcoded honey height
		honey.position.set(this.UIWidth/2, Manager.height/5 + 18);
		honeyContainer.addChild(honey);

		uiContainer.addChild(honeyContainer);

		//inventory
		const inventoryGraphics = new Graphics();
		inventoryGraphics.beginFill(0xFFF7D4);
		const inventoryBox = inventoryGraphics.drawRoundedRect(this.UIWidth/7, Manager.height/1.8, this.UIWidth/1.4, 400, 30);
		inventoryGraphics.endFill();
		uiContainer.addChild(inventoryBox);

		//scroll box
		this.mInventory = new ScrollBox({
			width: inventoryBox.width/1.04,
			height: inventoryBox.height/1.3,
			background: 0xC07F00,
			padding: 30,
			elementsMargin: 20,
			radius: 25,
		});
		//TODO: fix way this is positioned
		this.mInventory.x = this.UIWidth/8 + inventoryBox.width/24;
		this.mInventory.y = Manager.height/1.8 + inventoryBox.height/5;
		//add jar displays (if list is not empty)
		if(this.mJars.length > 0){
			this.mJars.forEach(jar => {
				this.mInventory.addItem(jar.GetDisplay());
			});
		}
		uiContainer.addChild(this.mInventory);

		//text
		this.mJarsText.anchor.set(0.5);
		this.mJarsText.position.set(this.UIWidth/2, Manager.height/2.3);
		uiContainer.addChild(this.mJarsText);
		this.mHoneyCount.anchor.set(0.5);
		this.mHoneyCount.position.set(this.UIWidth/2, Manager.height/5);
		uiContainer.addChild(this.mHoneyCount);
		this.mInventoryTitle.anchor.set(0.5);
		this.mInventoryTitle.position.set(this.UIWidth/2, Manager.height/1.7);
		uiContainer.addChild(this.mInventoryTitle);
		

		//final ui constructed
		this.mScene.addChild(uiContainer);
	}
	public override OnUpdate(): void {
		//update honey jar to match honey count
		//get honey count and set mask pos accordingly
		const currentHoney: number = <number>Manager.dataHandler.GetData("honey");
		const currentHoneyDisplay: string = Helper.FormatNumberForDisplay(currentHoney);
		const currentJars: number = <number>Manager.dataHandler.GetData("regular_jars");
		const honeyLevel = currentHoney/this.mHoneyFullLevel;
		this.mHoneyMask.y = (this.mHoneyFullLevel * (honeyLevel*-1))/1.18;
		if(currentHoney >= this.MAX_HONEY){
			Manager.dataHandler.SetData("regular_jars", (currentJars + 1) as number);
			if(this.mJars.length > 0){
				this.mJars.forEach(jar => {
					//add 1 jar to stack
					if(!jar.IsFull()){
						jar.AddItem();
					}
				});
			}
			//if no jars, make new jar
			else{
				//TODO: get jar type from honey being made, later
				new Jar(this.mScene, JarType.Regular);
			}
			Manager.dataHandler.SetData("honey", (0) as number);
			this.mHoneyMask.y = this.mHoneyEmptyLevel;
		}
		//set text
		this.mHoneyCount.text = 'Honey: ' + currentHoneyDisplay;
		this.mJarsText.text = 'Total Jars: ' + currentJars;
		
	}
	/**
     * Changes inventory that is open
     */
	private ChangeInventory(): void{
		//change inventory title
		//display correct scrollbox items
	}
	/**
	 * Adds a new jar object to inventory (JAR JAR)
	 */
	public AddJarToInventory(jar: Jar): void{
		this.mJars.push(jar);
		this.mInventory.addItem(jar.GetDisplay());
	}

}