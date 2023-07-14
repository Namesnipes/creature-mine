import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import {Container, ObservablePoint, Point, Texture} from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';

export class BeeActor extends Actor {
    private mMover: LerpComponent = new LerpComponent(this);
    private middle: Boolean = true;
    private returnPoint: Point;
    constructor(scene: Scene, parent?: Container){
        super(scene);

        // if there is a parent, add this actor to the children of the parent
        if(typeof parent !== "undefined"){
            parent?.addChild(this)
        }

        this.anchor.set(0.5);
        this.scale.set(0.1,0.1);
        console.log(this)
        this.SetTexture(Texture.from('bee'));
    }

    public setReturnPoint(x: number, y: number){
        this.returnPoint = new Point(x,y)
    }

    public async collectHoney(){
        return new Promise<void>(async (resolve, reject) => {
            
            let flowers = this.mScene.getFlowers()
            let flower = flowers[Math.floor(Math.random()*flowers.length)];
            await this.mMover.Move(flower.x, flower.y);
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));

            await this.mMover.Move(this.returnPoint.x,this.returnPoint.y)
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
            resolve()
        })
    }

}