import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import {Container, Texture} from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';

export class BeeActor extends Actor {
    private mMover: LerpComponent = new LerpComponent(this);
    private middle: Boolean = true;
    private horizontalFlyLimit: number = 100;
    private verticalFlyLimit: number = 100;
    constructor(scene: Scene, parent?: Container){
        super(scene);

        // if there is a parent, add this actor to the children of the parent
        if(typeof parent !== "undefined"){
            parent?.addChild(this)
        }

        this.anchor.set(0.5);
        this.scale.set(0.1,0.1);
        this.SetTexture(Texture.from('bee'));
    }

    public setFlyingBounds(horizontal: number, vertical: number){
        this.horizontalFlyLimit = horizontal;
        this.verticalFlyLimit = vertical
    }

    public startFlying(){
        this.mMover.Move(this.horizontalFlyLimit/2 * Math.random(), this.verticalFlyLimit/2 * Math.random());
        setInterval(() =>{
            if(this.middle){
                this.mMover.Move(this.horizontalFlyLimit/2, this.verticalFlyLimit/2);
            } else {
                this.mMover.Move(Math.random() * this.horizontalFlyLimit, Math.random() * this.verticalFlyLimit);
            }

            this.middle = !this.middle
        },Math.random()*4000)
    }

}