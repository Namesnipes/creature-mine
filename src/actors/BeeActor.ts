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
        this.mMover.Move(Manager.width/2, Manager.height/2);
        setInterval(() =>{

            if(this.middle){
                this.mMover.Move(Manager.width/2, Manager.height/2);
            } else {
                this.mMover.Move(Math.random() * Manager.width, Math.random() * Manager.height);
            }

            this.middle = !this.middle
        },Math.random()*4000)
    }

}