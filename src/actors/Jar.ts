import { Scene } from '../scenes/Scene1';
import { InventoryItem, ItemType } from './InventoryItem';

export enum JarType{
    Regular,
    Strawberry,
    Blueberry
}
export class Jar extends InventoryItem{
    mJarType: JarType;
    mSprite: string;
    constructor(scene: Scene, jarType: JarType) {
		super(scene, ItemType.Jar);
        this.mJarType = jarType;
        switch(this.mJarType){
            case JarType.Regular:
            {
                this.mSprite = "jar1.png";
                break;
            }
            case JarType.Strawberry:
            {
                this.mSprite = "jar2.png";
                break;
            }
            case JarType.Blueberry:
            {
                this.mSprite = "jar3.png";
                break;
            }
        }
        this.MakeNewInventoryItem(this.mSprite);
        //add item to correct inventory list in ui
        this.mScene.GetUI().AddJarToInventory(this);
	}
    public override AddItem(): void{
        if(this.mNumItems == this.MAX_STACK){
            //make new jar item if current stack is full
            this.mIsFull = true;
            new Jar(this.mScene, this.mJarType);
        }
        else{
            super.AddItem();
        }
    }
}