import { Container, Ticker, Text, TextStyle} from 'pixi.js';
import { IScene, Manager } from "../Manager";
import { Actor } from '../Actor';
import { CookieActor } from '../CookieActor';
import { UserInput } from "../UserInput";

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
    mText = new Text('Cookies: ', this.mTextStyle);
    mCookie: CookieActor = new CookieActor(this);

    // We promoted clampy to a member of the class
    constructor() {
        super(); // Mandatory! This calls the superclass constructor.

        // see how members of the class need `this.`?
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;

        
        

    }

    onAssetsLoaded(): void {
        this.addChild(this.mCookie);
        this.addChild(this.mText);
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
        this.mActors.forEach(function(child){
            child.Update(Ticker.shared.deltaMS);
        });
    }

    //update
    update(_framesPassed: number): void {
        this.ProcessInput();
        this.UpdateActors();
        this.mText.text = 'Cookies: ' + this.mCookie.GetClickNum();
        
    }
    GetCookie(): CookieActor{
        return this.mCookie;
    }
}
