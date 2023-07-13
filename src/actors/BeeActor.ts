import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Texture} from 'pixi.js';

export class BeeActor extends Actor {
    private mClicker: ClickComponent = new ClickComponent(this,this.onClick);
    constructor(scene: Scene){
        super(scene);
        this.anchor.set(0.5);
        this.x = Manager.width/2.0;
        this.y = Manager.height/2.0;
        this.scale.set(0.1,0.1);
        this.SetTexture(Texture.from('bee')); 
    }
    public GetClickNum(): number{
        console.log(this.mClicker.mClickNum);
        return this.mClicker.mClickNum;
    }

    public onClick(): void {
        
    }

    Lerp(start: number, stop: number, amt: number) {
        if (amt > 1)
            amt = 1;
        else if (amt < 0)
            amt = 0;
        return start + (stop - start) * amt;
    }
}