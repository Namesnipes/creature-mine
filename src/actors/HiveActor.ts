import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Container, FederatedMouseEvent, Texture} from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import { ParticleComponent } from '../components/ParticleComponent';
import { BeeActor } from './BeeActor';
import { SwarmContainer } from './SwarmContainer';

export class HiveActor extends Actor {
    public mClicker: ClickComponent = new ClickComponent(this,this.onClick,Manager.dataHandler.getData("honey"));
    private mEmitter: ParticleComponent = new ParticleComponent(this,particleSettings);
    private mContainer: SwarmContainer;
    private bees: BeeActor[] = [];
    constructor(scene: Scene){
        super(scene);
        this.SetTexture(Texture.from('hive'));
        this.scale.set(0.5,0.5);

        // set position to top right of screen
        this.x = Manager.width - this.width;
        this.y = 0;

        this.mContainer = new SwarmContainer(this.mScene,this.width,this.height);
        this.mContainer.zIndex = this.zIndex + 1
        this.mContainer.x = this.x;
        this.mContainer.y = this.y;
        this.makeBee()

    }
    public onClick(e:FederatedMouseEvent): void {
        Manager.dataHandler.setData("honey",this.mClicker.mClickNum)
        this.mEmitter.emitParticles(e.getLocalPosition(this).x,e.getLocalPosition(this).y);
        this.makeBee()
    }

    public makeBee(){
        let bee: BeeActor = new BeeActor(this.mScene,this.mContainer);
        bee.scale.set(0.05,0.05)
        bee.setFlyingBounds(this.width,this.height);
        bee.startFlying();
    }
}