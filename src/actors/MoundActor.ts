import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { FederatedEventHandler, FederatedMouseEvent, FederatedPointerEvent, Texture } from 'pixi.js';
import { ClickComponent } from '../components/ClickComponent';
import { FlowerActor } from './FlowerActor';

export class MoundActor extends Actor {
    public mClicker: ClickComponent = new ClickComponent(this, this.onClick);
    public mFlower: FlowerActor;
    constructor(scene: Scene) {
        super(scene);
        this.anchor.set(0.5);
        this.x = Manager.width;
        this.y = Manager.height;
        this.scale.set(0.1, 0.1);
        this.SetTexture(Texture.from('mound'));
        //add flower to flower array in scene on construction
    }

    public onClick(e: FederatedMouseEvent): void {
        console.log("clicked mound");
        this.mFlower = new FlowerActor(this.mScene);
        this.mFlower.x = this.x;
        this.mFlower.y = this.y - 60;
        this.mScene.addChild(this.mFlower);
    }
}