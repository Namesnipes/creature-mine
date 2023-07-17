import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { Container, FederatedMouseEvent, ObservablePoint, Texture } from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import { ParticleComponent } from '../components/ParticleComponent';
import { BeeActor } from './BeeActor';

export class HiveActor extends Actor {
    public mClicker: ClickComponent = new ClickComponent(this, this.onClick, Manager.dataHandler.getNumberData("honey"));
    private mEmitter: ParticleComponent = new ParticleComponent(this, particleSettings);
    
    constructor(scene: Scene) {
        super(scene);
        this.SetTexture(Texture.from('hive'));
        this.scale.set(0.5, 0.5);

        // set position to top right of screen
        this.x = Manager.width - this.width;
        this.y = 0;
        this.MakeBee()

    }
    public onClick(e: FederatedMouseEvent): void {
        this.AddHoney()
        this.mEmitter.emitParticles(e.getLocalPosition(this).x, e.getLocalPosition(this).y);
        this.MakeBee()
    }

    /**
     * Creates a new BeeActor and adds it to the scene.
     *
     * @returns {void} 
     */
    public MakeBee() {
        let bee: BeeActor = new BeeActor(this.mScene);
        this.mScene.addChild(bee)
        bee.zIndex = 100
        bee.scale.set(0.05, 0.05)
        bee.SetReturnPoint(this.x + this.width / 2, this.y + this.height / 2)
        this.StartWorking(bee)
    }

    /**
     * Makes a bee start collecting honey.
     *
     * @param {BeeActor} b - The BeeActor to start working for.
     */
    public async StartWorking(b: BeeActor) {
        await b.CollectHoney()
        this.AddHoney()
        this.StartWorking(b)
    }
    /**
     * Adds 1 honey to the data store.
     *
     */
    public AddHoney() {
        let currentHoney: number = Manager.dataHandler.getNumberData("honey")
        Manager.dataHandler.setData("honey", (currentHoney + 1) as number)
    }
}