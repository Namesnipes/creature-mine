import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Texture} from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';

export class BeeActor extends Actor {
    private mMover: LerpComponent = new LerpComponent(this);
    private middle: Boolean = true;
    constructor(scene: Scene){
        super(scene);
        this.anchor.set(0.5);
        this.x = Manager.width;
        this.y = Manager.height;
        this.scale.set(0.1,0.1);
        this.SetTexture(Texture.from('bee'));
        this.mMover.Move(Manager.width/2 * Math.random(), Manager.height/2 * Math.random());
        setInterval(() =>{

            if(this.middle){
                this.mMover.Move(this.parent.width/2, this.parent.height/2);
            } else {
                this.mMover.Move(Math.random() * ((this.parent.width) * 5 - (this.parent.width) * 2.5), Math.random() * (this.parent.height) * 5);
            }

            this.middle = !this.middle
        },Math.random()*4000)
    }

}