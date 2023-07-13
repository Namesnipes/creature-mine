import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Container, FederatedMouseEvent, Texture} from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import { ParticleComponent } from '../components/ParticleComponent';

export class HiveActor extends Actor {
    private mClicker: ClickComponent = new ClickComponent(this,this.onClick,Manager.dataHandler.getData("honey"));
    private mEmitter: ParticleComponent = new ParticleComponent(this,particleSettings);
    constructor(scene: Scene){
        super(scene);
        this.anchor.set(0.5);
        this.SetTexture(Texture.from('hive'));
        this.scale.set(0.5,0.5);

        // set position to top right of screen
        this.x = Manager.width - this.width/2;
        this.y = 0 + this.height/2;

    }
    public onClick(e:FederatedMouseEvent): void {
        Manager.dataHandler.setData("honey",this.mClicker.mClickNum)
        this.mEmitter.emitParticles(e.getLocalPosition(this).x,e.getLocalPosition(this).y);
    }
}