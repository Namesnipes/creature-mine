import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import {Container, Texture} from 'pixi.js';

export class GardenContainer extends Container {
    constructor(scene: Scene){
        super();
        this.x = 0
        this.y = Manager.height/2
    }

}