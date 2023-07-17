import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { Texture } from 'pixi.js';

export class FlowerActor extends Actor {
    constructor(scene: Scene) {
        super(scene);
        this.anchor.set(0.5);
        this.x = Manager.width;
        this.y = Manager.height;
        this.scale.set(0.1, 0.1);
        this.SetTexture(Texture.from('flower'));
    }

}