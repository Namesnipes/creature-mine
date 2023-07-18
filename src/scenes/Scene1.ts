import { Container, Ticker, Text, TextStyle} from 'pixi.js';
import { Manager } from "../Manager";
import { IScene } from './IScene';
import { Actor } from '../actors/Actor';
import { HiveActor } from '../actors/HiveActor';
import { FlowerActor } from '../actors/FlowerActor';
import { UIActor } from '../actors/UIActor';

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
    mFlowerField: Array<FlowerActor> = [];
    mUI: UIActor = new UIActor(this);

    constructor() {
        super(); // Mandatory! This calls the superclass constructor.
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.sortableChildren = true; // Lets zindex work
        
    }

    public OnAssetsLoaded(): void {
        this.CreateFlowerField();
        this.mHive = new HiveActor(this);
        this.addChild(this.mHive);
        this.addChild(this.mText);
    }

    /**
     * Create a flower field by generating 10 flower actors and adding them to the scene, in random locations.
     *
     * @return {void}
     */
    private CreateFlowerField(): void{
        for(let i = 0; i < 10; i++){
            const flower = new FlowerActor(this);
            //move flowers from ui (ugly solution change latr)
            flower.x = Math.random ()*Manager.width + Manager.width/4;
            if(flower.x > Manager.width){
                flower.x = Manager.width - flower.width;
            }
            flower.y = Manager.height/2 + Math.random ()*Manager.height/2;
            this.addChild(flower);
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
        this.mText.text = 'Honey: ' + Manager.dataHandler.GetNumberData("honey")
        
    }
}
