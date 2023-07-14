import { Scene } from '../scenes/Scene1';
import {Container} from 'pixi.js';

export class SwarmContainer extends Container {
    public widthBounds: number;
    public heightBounds: number;
    constructor(scene: Scene, width: number, height: number){
        super();
        scene.addChild(this)
        this.widthBounds = width;
        this.heightBounds = height;
    }

}