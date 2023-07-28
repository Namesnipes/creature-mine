import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Container, Point, Texture } from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';
import { Helper } from '../Helper';

export class BeeActor extends Actor {
	private mMover: LerpComponent = new LerpComponent(this);
	private mMiddle: boolean = true;
	private mReturnPoint: Point;

	constructor(scene: Scene, parent?: Container) {
		super(scene);

		// if there is a parent, add this actor to the children of the parent
		if (typeof parent !== "undefined") {
			parent?.addChild(this);
		}
		this.scale.set(0.1, 0.1);
		this.SetTexture(Texture.from('bee'));
	}

	/**
     * Sets the point where the bee will return to after collecting honey.
     *
     * @param {number} x - The x-coordinate of the return point.
     * @param {number} y - The y-coordinate of the return point.
     */
	public SetReturnPoint(x: number, y: number) {
		this.mReturnPoint = new Point(x, y);
	}

	public async CollectHoney(): Promise<boolean> {
		const flowers = this.mScene.GetFlowers();
		const flower = flowers[Math.floor(Math.random() * flowers.length)];

		if (flower) {
			const randx = Helper.randomIntFromInterval(-25,25);
			const randy = Helper.randomIntFromInterval(-25,25);
			const randx2 = Helper.randomIntFromInterval(-100,100);
			const randy2 = Helper.randomIntFromInterval(-100,100);
			await this.mMover.Move(flower.x + 60 + randx, flower.y + 60 + randy);
			await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));

			await this.mMover.Move(this.mReturnPoint.x + randx2, this.mReturnPoint.y + randy2);
			await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));
			return true;
		} else {
			await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));
			return false;
		}

	}

}