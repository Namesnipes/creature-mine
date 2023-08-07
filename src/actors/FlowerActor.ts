import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { Texture } from 'pixi.js';

import FlowerTypes from './FlowerTypes.json';

export class FlowerActor extends Actor {
	private type: string;
	//TODO: add a variable for coordinates of flower where bees should land on (this will most likely be custom for each flower)
	constructor(scene: Scene, type: string) {
		super(scene);
		if(type in FlowerTypes){
			const definition = FlowerTypes[type as keyof typeof FlowerTypes]; // what
			this.type = type;
			this.SetTexture(Texture.from(definition.texture_name));
		} else {
			throw new Error("Flower type not found");
		}
		this.type = type;
		this.x = Manager.width;
		this.y = Manager.height;
		//add flower to flower array in scene on construction
		this.mScene.AddFlower(this);
	}

	clone(): FlowerActor {
		return new FlowerActor(this.mScene,this.type);
	}

}

export class FlowerFactory {
	static createFlower(scene: Scene,type: string): FlowerActor {
		return new FlowerActor(scene, type);
	}
}