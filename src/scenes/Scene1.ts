import { Container, Ticker, Text, TextStyle, Graphics} from 'pixi.js';
import { Manager } from "../Manager";
import { IScene } from './IScene';
import { Actor } from '../actors/Actor';
import { CookieActor } from '../actors/CookieActor';
import { HiveActor } from '../actors/HiveActor';
import { BeeActor } from '../actors/BeeActor';
import { FlowerActor } from '../actors/FlowerActor';
import { GardenContainer } from '../actors/GardenContainer';

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
        this.mHive = new HiveActor(this);
        this.addChild(this.mHive)
        this.addChild(this.mText)
        this.createFlowerField()
    }

    private createFlowerField(): void{
        let garden: GardenContainer = new GardenContainer(this);
        for(let i = 0; i < 10; i++){
            var flower = new FlowerActor(this);
            flower.x = Math.random ()*Manager.width
            flower.y = Math.random ()*Manager.height/2
            garden.addChild(flower)
        }
        this.addChild(garden)
    }
    public AddActor(actor: Actor): void{
        this.mActors.push(actor);
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
        this.mText.text = 'Bees: ' + this.mHive.mClicker.mClickNum
        
    }
}
