import { Container, Ticker, Text, TextStyle, Graphics} from 'pixi.js';
import { Manager } from "../Manager";
import { IScene } from './IScene';
import { Actor } from '../actors/Actor';
import { HiveActor } from '../actors/HiveActor';
import { BeeActor } from '../actors/BeeActor';
import { FlowerActor } from '../actors/FlowerActor';

export class Scene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    assetBundles:string[] = ["MainScreen"];
    mActors : Array<Actor> = [];
    mTextStyle = new TextStyle({
        fill: "#ffffff",
        fontFamily: "Georgia",
        fontSize: 70,
        fontWeight: "bold",
        letterSpacing: 2,
        lineJoin: "round",
        miterLimit: 0,
        strokeThickness: 6
    });
    mText = new Text('Bees: ', this.mTextStyle);
    mHive: HiveActor;
    mBee: BeeActor;
    mFlower: FlowerActor;

    constructor() {
        super(); // Mandatory! This calls the superclass constructor.
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.sortableChildren = true; // Lets zindex work
        
        

    }

    public onAssetsLoaded(): void {
        this.createFlowerField()
        this.mHive = new HiveActor(this);
        this.addChild(this.mHive)
        this.addChild(this.mText)
    }

    private createFlowerField(): void{
        for(let i = 0; i < 10; i++){
            var flower = new FlowerActor(this);
            flower.x = Math.random ()*Manager.width
            flower.y = Manager.height/2 + Math.random ()*Manager.height/2
            this.addChild(flower)
        }
    }
    public AddActor(actor: Actor): void{
        this.mActors.push(actor);
    }

    public getActors(): Array<Actor>{
        return this.mActors;
    }

    /**
     * Retrieves an array of all FlowerActor objects in the scene.
     *
     * @return {Array<FlowerActor>} An array of FlowerActor objects.
     */
    public getFlowers(): Array<FlowerActor>{
        let temp = []
        for (const flower of this.mActors) {
            if (flower instanceof FlowerActor) {
                temp.push(flower)
            }
        }
        return temp
    }
    //process input on all actors
    private ProcessInput(): void{
        //TODO:make a copy of mactors and go thru that instead
        this.mActors.forEach(function(child){
            child.ProcessInput();
        });
    }
    //update input on all actors
    private UpdateActors(): void{
        //TODO:make a copy of mactors and go thru that instead
        //console.log(this.mActors)
        this.mActors.forEach(function(child){
            child.Update(Ticker.shared.deltaMS);
        });
    }

    //update
    update(_framesPassed: number): void {
        this.ProcessInput();
        this.UpdateActors();
        this.mText.text = 'Honey: ' + Manager.dataHandler.getNumberData("honey")
        
    }
}
