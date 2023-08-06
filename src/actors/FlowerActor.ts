import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { Texture } from 'pixi.js';

export class FlowerActor extends Actor {
	//TODO: add a variable for coordinates of flower where bees should land on (this will most likely be custom for each flower)
	constructor(scene: Scene) {
		super(scene);
		this.x = Manager.width;
		this.y = Manager.height;
		//add flower to flower array in scene on construction
		this.mScene.AddFlower(this);
	}

}