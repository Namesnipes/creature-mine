import { Actor } from '../Actor';
import { Scene } from '../../scenes/Scene1';
import { Manager } from '../../Manager';
import { Point, Texture } from 'pixi.js';
import { FlowerActor } from '../FlowerActor';

export class Flower3Actor extends FlowerActor {
	constructor(scene: Scene) {
		super(scene);
		this.SetTexture(Texture.from('flower3'));
		this.scale = new Point(1, 1);
	}

}