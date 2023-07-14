import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Container, FederatedMouseEvent, ObservablePoint, Texture} from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import { ParticleComponent } from '../components/ParticleComponent';
import { BeeActor } from './BeeActor';

export class HiveActor extends Actor {
    public mClicker: ClickComponent = new ClickComponent(this,this.onClick,Manager.dataHandler.getNumberData("honey"));
    private mEmitter: ParticleComponent = new ParticleComponent(this,particleSettings);
    constructor(scene: Scene){
        super(scene);
        this.SetTexture(Texture.from('hive'));
        this.scale.set(0.5,0.5);

        // set position to top right of screen
        this.x = Manager.width - this.width;
        this.y = 0;
        this.makeBee()

    }
    public onClick(e:FederatedMouseEvent): void {
        this.addHoney()
        this.mEmitter.emitParticles(e.getLocalPosition(this).x,e.getLocalPosition(this).y);
        this.makeBee()
    }

    public makeBee(){
        let bee: BeeActor = new BeeActor(this.mScene);
        this.mScene.addChild(bee)
        bee.zIndex = 100
        bee.scale.set(0.05,0.05)
        bee.setReturnPoint(this.x + this.width/2, this.y + this.height/2)
        this.startWorking(bee)
    }

    public async startWorking(b: BeeActor){
        await b.collectHoney()
        this.addHoney()
        this.startWorking(b)
    }
    public addHoney(){
        let currentHoney: number = Manager.dataHandler.getNumberData("honey")
        console.log(currentHoney)
        Manager.dataHandler.setData("honey",(currentHoney + 1) as number)
    }
}