import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {FederatedMouseEvent, Texture} from 'pixi.js';

export class HiveActor extends Actor {
    private mClicker: ClickComponent = new ClickComponent(this,this.onClick);
    constructor(scene: Scene){
        super(scene);
        this.anchor.set(0.5); // 0,0 is at top right of the sprite
        this.SetTexture(Texture.from('hive'));
        this.scale.set(0.5,0.5);

        // set position to top right of screen
        this.x = Manager.width - this.width/2;
        this.y = 0 + this.height/2;

    }
    public onClick(): void {
        console.log("yes")
    }
}