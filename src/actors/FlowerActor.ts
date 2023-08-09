import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { Texture } from 'pixi.js';

import FlowerTypes from './FlowerTypes.json';

export class FlowerActor extends Actor {
	private mType: string;
	private _mBeeLandingCoordinateX: number;
	private _mBeeLandingCoordinateY: number;
	private _mBeeLandingRadius: number;


	constructor(scene: Scene, type: string) {
		super(scene);
		if (type in FlowerTypes) {
			const definition = FlowerTypes[type as keyof typeof FlowerTypes]; // what
			this.mType = type;
			this.mBeeLandingCoordinateX = definition.bee_landing_coordinates.x;
			this.mBeeLandingCoordinateY = definition.bee_landing_coordinates.y;
			this.mBeeLandingRadius = definition.bee_landing_radius;
			this.SetTexture(Texture.from(definition.texture_name));
		} else {
			throw new Error("Flower type not found");
		}
		this.mType = type;
		this.x = Manager.width;
		this.y = Manager.height;
		//add flower to flower array in scene on construction
		this.mScene.AddFlower(this);
	}

	public get mBeeLandingCoordinateX(): number {
		return this._mBeeLandingCoordinateX;
	}
	public set mBeeLandingCoordinateX(value: number) {
		this._mBeeLandingCoordinateX = value;
	}

	public get mBeeLandingCoordinateY(): number {
		return this._mBeeLandingCoordinateY;
	}
	public set mBeeLandingCoordinateY(value: number) {
		this._mBeeLandingCoordinateY = value;
	}

	public get mBeeLandingRadius(): number {
		return this._mBeeLandingRadius;
	}
	public set mBeeLandingRadius(value: number) {
		this._mBeeLandingRadius = value;
	}



	clone(): FlowerActor {
		return new FlowerActor(this.mScene, this.mType);
	}

}

export class FlowerFactory {
	static createFlower(scene: Scene, type: string): FlowerActor {
		return new FlowerActor(scene, type);
	}
}