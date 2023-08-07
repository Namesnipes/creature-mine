import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Graphics, Container, Sprite, Text, TextStyle } from 'pixi.js';

export enum ItemType{
    Jar,
    Seed
}
export abstract class InventoryItem extends Actor{
    //inventory data
    mItemType: ItemType;
    mNumItems: number = 1;
    MAX_STACK: number = 5;
    INVENTORY_ITEM_SIZE: number = 100;
    mDisplay: Container;
    mIsFull: boolean = false;
    //for item stack number
    mTextStyle = new TextStyle({
		fontFamily: "Comic Sans MS",
		fontSize: 32,
		miterLimit: 0,
		stroke: "#ffd219",
		strokeThickness: 3
	});
    mNumText = new Text(this.mNumItems, this.mTextStyle);
    constructor(scene: Scene, itemType: ItemType) {
		super(scene);
        this.mItemType = itemType;
	}
    /**
	 * Creates a new inventory item with the specified sprite name and number of items.
	 * Displayed in inventory scroll box.
	 *
	 * @param {string} spriteName - The name of the sprite for the item.
	 * @param {string} numOfItems - The number of items. Defaults to '0' if not provided.
	 * @return {void} This function does not return a value.
	 */
	protected MakeNewInventoryItem(spriteName: string): void{
		//inventory item box
		const item = new Container().addChild(new Graphics().beginFill(0xffffff).drawRect(0, 0, this.INVENTORY_ITEM_SIZE, this.INVENTORY_ITEM_SIZE));
		//item's image
		const sprite = Sprite.from(spriteName);
		sprite.position.x = this.INVENTORY_ITEM_SIZE/2;
		sprite.position.y = this.INVENTORY_ITEM_SIZE/2;
		sprite.anchor.set(0.5);
		item.addChild(sprite);
		//num of item
		this.mNumText.position.x = this.INVENTORY_ITEM_SIZE;
		this.mNumText.position.y = this.INVENTORY_ITEM_SIZE;
		this.mNumText.anchor.set(1, 0.8);
		item.addChild(this.mNumText);
        this.mDisplay = item;
	}
    public AddItem(): void{
        this.mNumItems++;
        //TODO: have inventory data stored...
        this.mNumText.text = this.mNumItems;
    }
    public GetDisplay(): Container{
        return this.mDisplay;
    }
    public IsFull(): boolean{
        return this.mIsFull;
    }
}