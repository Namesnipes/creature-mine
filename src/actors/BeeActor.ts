import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Point, Texture } from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';
import { Helper } from '../Helper';
import { HiveActor } from './HiveActor';

export class BeeActor extends Actor {
	//TODO: clean up vars, add getters and setters
	private mMover: LerpComponent = new LerpComponent(this);
	private mReturnPoint: Point;

	private readonly MaxPollenCollectTime = 5000;
	private readonly MinPollenCollectTime = 2000;
	private readonly MaxPollenDepositTime = 5000;
	private readonly MinPollenDepositTime = 2000;
	private readonly MaxNectarInventory = 5;
	private CurrentNectarInventory = 0;
	private readonly NectarPerSecond = 1;
	private DrainingNectar = false;
	private readonly RetryTime = 5000;

	mHive: HiveActor;

	constructor(scene: Scene, hive: HiveActor) {
		super(scene);
		this.mHive = hive;
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

	//TODO: clean up this function, make this code more robust, also maybe find a soluition to the floating point stuff :D (rounding?)
	public async CollectHoney(): Promise<number> {
		const flowers = this.mScene.GetFlowers();
		const flower = flowers[Math.floor(Math.random() * flowers.length)];
		if (flower) {
			const randx = Helper.randomIntFromInterval(-25,25);
			const randy = Helper.randomIntFromInterval(-25,25);
			const randx2 = Helper.randomIntFromInterval(-100,100);
			const randy2 = Helper.randomIntFromInterval(-100,100);
			await this.mMover.Move(flower.x + 60 + randx, flower.y + 60 + randy); // move to flower
			//it may be beneficial to add a loop and add nectar every second, then the resolve condition is if nectar inventory >= max nectar inventory
			await new Promise(resolve => setTimeout(resolve, (this.MaxNectarInventory / this.NectarPerSecond) * 1000)); // suck nectar
			this.CurrentNectarInventory = this.MaxNectarInventory;
			await this.mMover.Move(this.mReturnPoint.x + randx2, this.mReturnPoint.y + randy2); // move to hive

			this.DrainingNectar = true;

			//wait until nectar inventory is empty (0) (maybe use events for this?)
			while (this.CurrentNectarInventory > 0) {
				await new Promise(resolve => setTimeout(resolve, 1000));
			}

			return this.MaxNectarInventory;
		} else {
			await new Promise(resolve => setTimeout(resolve, Math.random() * this.RetryTime));
			return 0;
		}

	}

	override OnUpdate(delta: number) {
		if(this.DrainingNectar){
			if(this.CurrentNectarInventory > 0){
				let NectarToAdd = this.NectarPerSecond * delta/1000;
				if(NectarToAdd > this.CurrentNectarInventory){
					NectarToAdd = this.CurrentNectarInventory;
				}
				this.CurrentNectarInventory -= NectarToAdd;
				this.mHive.AddHoney(NectarToAdd);
			}
			else{
				this.DrainingNectar = false;
			}
		}
	}

}