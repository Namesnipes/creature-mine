import { Actor } from './Actor';
import { ClickComponent } from './ClickComponent';
import { Scene } from './scenes/Scene1';
import { Manager } from './Manager';
import {Texture} from 'pixi.js';
export class CookieActor extends Actor {
    private mClicker: ClickComponent = new ClickComponent(this);
    constructor(scene: Scene){
        super(scene);
        this.anchor.set(0.5)
        this.x = Manager.width/2.0;
        this.y = Manager.height/2.0;
        this.SetTexture(Texture.from('cookie.png')); 
    }
    public GetClickNum(): number{
        console.log(this.mClicker.mClickNum);
        return this.mClicker.mClickNum;
    }
}