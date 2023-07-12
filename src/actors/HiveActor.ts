import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Container, FederatedMouseEvent, Texture} from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import * as particles from '@pixi/particle-emitter';

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
    public onClick(e:FederatedMouseEvent): void {
        const particleContainer = new Container();
        //this.addChild(particleContainer);
        const emitter = new particles.Emitter(particleContainer,particleSettings);
        emitter.autoUpdate = true;
        emitter.updateSpawnPos(e.globalX-Manager.width/2, e.globalY-Manager.height/2);
        emitter.emit = true;
        setTimeout(function(){
            emitter.emit = false
        },500);
    }
}