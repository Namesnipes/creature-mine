import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Graphics, Container, Sprite, Texture, Text, TextStyle } from 'pixi.js';
import { Manager } from '../Manager';
import { Helper } from '../Helper';
import {ScrollBox } from "@pixi/ui";
export class UIActor extends Actor {
	private UIWidth: number;
	mHoneyEmptyLevel: number = Texture.from('honey').height + Texture.from('honey').height/2 + 10;
	mHoneyFullLevel: number = Texture.from('honey').height - Texture.from('honey').height/2 + 8;
	private readonly MAX_HONEY = 300;
	private readonly INVENTORY_ITEM_SIZE = 100;
	private readonly MAX_JAR_STACK = 10;
	mHoneyMask: Graphics;
	//text
	mTextStyle = new TextStyle({
		fontFamily: "Comic Sans MS",
		fontSize: 32,
		miterLimit: 0,
		stroke: "#ffd219",
		strokeThickness: 3
	});
	mJarsText = new Text('Jars:', this.mTextStyle);
	mHoneyCount = new Text('Honey:', this.mTextStyle);
	//default is jar inventory
	mInventoryTitle = new Text('Jars', this.mTextStyle);
	//inventories
	mInventory: ScrollBox;
	mJars: Array<Container> = [];

	constructor(scene: Scene, width: number) {
		super(scene);
		this.UIWidth = width;
		//TEST LIST OF JARS!!!
		this.MakeNewInventoryItem("jar","regularJar","jar1.png");
		this.MakeNewInventoryItem("jar","strawberryJar","jar2.png");
		this.MakeNewInventoryItem("jar","blueberryJar","jar3.png");
		this.MakeNewInventoryItem("jar","regularJar","jar1.png");
		this.MakeNewInventoryItem("jar","strawberryJar","jar2.png");
		this.MakeNewInventoryItem("jar","blueberryJar","jar3.png");
		this.MakeNewInventoryItem("jar","regularJar","jar1.png");
		this.MakeNewInventoryItem("jar","strawberryJar","jar2.png");
		this.MakeNewInventoryItem("jar","blueberryJar","jar3.png");
		
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
		this.mInventory.addItems(this.mJars);

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
			//TODO: add correct kind of jar depending on what kind of honey was used
			this.AddJar("regular_jars");
			Manager.dataHandler.SetData("honey", (0) as number);
			this.mHoneyMask.y = this.mHoneyEmptyLevel;
		}
		//set text
		this.mHoneyCount.text = 'Honey: ' + currentHoneyDisplay;
		this.mJarsText.text = 'Jars: ' + currentJars;
		
	}
	/**
	 * Adds a jar to jar inventory
	 */
	public AddJar(jarType: string): void {
		if(jarType == "regular_jars"){
			//TODO: add number to inventory count
			if(this.mJars[0] != null){
				const t = this.mJars[0].getChildByName("numOfItems");
			}
		}
	}
	/**
     * Changes inventory that is open
     */
	private ChangeInventory(): void{
		//change inventory title
		//display correct scrollbox items

		
	}
	//TODO: make inventory class as a centralized place for all things inventory 
	/**
	 * Creates a new inventory item with the specified sprite name and number of items.
	 * Displayed in inventory scroll box.
	 *
	 * @param {string} spriteName - The name of the sprite for the item.
	 * @param {string} numOfItems - The number of items. Defaults to '0' if not provided.
	 * @return {void} This function does not return a value.
	 */
	private MakeNewInventoryItem(typeOfItem: string, itemName: string, spriteName: string, numOfItems: string = '0'): void{
		//inventory item box
		const item = new Container().addChild(new Graphics().beginFill(0xffffff).drawRect(0, 0, this.INVENTORY_ITEM_SIZE, this.INVENTORY_ITEM_SIZE));
		//item's image
		const sprite = Sprite.from(spriteName);
		sprite.position.x = this.INVENTORY_ITEM_SIZE/2;
		sprite.position.y = this.INVENTORY_ITEM_SIZE/2;
		sprite.anchor.set(0.5);
		item.addChild(sprite);
		//num of item
		const text = new Text(numOfItems,this.mTextStyle);
		text.name = 'numOfItems';
		text.position.x = this.INVENTORY_ITEM_SIZE;
		text.position.y = this.INVENTORY_ITEM_SIZE;
		text.anchor.set(1, 0.8);
		item.addChild(text);
		//add item to right inventory item list
		if(typeOfItem == "jar"){
			this.mJars.push(item);
		}
	}
    

}