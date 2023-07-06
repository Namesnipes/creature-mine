import { Container, Ticker, Texture} from 'pixi.js';
import { IScene, Manager } from "../Manager";
import { Actor } from './Actor';

export class Scene extends Container implements IScene {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    mActors : Array<Actor> = [];

    // We promoted clampy to a member of the class
    constructor() {
        super(); // Mandatory! This calls the superclass constructor.

        // see how members of the class need `this.`?
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;

        let cookie: Actor = new Actor(this);
        cookie.x = this.screenWidth/2.0;
        cookie.y = this.screenHeight/2.0;
        cookie.SetTexture(Texture.from('cookie.png'));
        this.addChild(cookie);

    }
    public AddActor(actor: Actor){
        this.mActors.push(actor);
    }
    //process input on all actors
    private ProcessInput(){
        //TODO:make a copy of mactors and go thru that instead
        this.mActors.forEach(function(child){
            child.ProcessInput();
        });
    }
    //update input on all actors
    private Update(){
        //TODO:make a copy of mactors and go thru that instead
        this.mActors.forEach(function(child){
            child.Update(Ticker.shared.deltaMS);
        });
    }
    //update
    update(_framesPassed: number): void {
        this.ProcessInput();
        this.Update();
    }
}
