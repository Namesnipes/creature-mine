import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Point, Texture } from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';
import { Helper } from '../Helper';
import { HiveActor } from './HiveActor';

export class BeeActor extends Actor {
	private mMover: LerpComponent = new LerpComponent(this);
	private mReturnPoint: Point;

	private DrainingNectar = false;
	private _CurrentNectarInventory = 0;

	private readonly MaxNectarInventory = 5;
	private readonly NectarPerSecond = 1;
	private readonly RetryTime = 5000;
	private readonly mHive: HiveActor;

	public get CurrentNectarInventory() {
		return this._CurrentNectarInventory;
	}
	public set CurrentNectarInventory(value) {

		if(value > this.MaxNectarInventory) {
			this._CurrentNectarInventory = this.MaxNectarInventory;
		}
		
		if(value < 0) {
			this._CurrentNectarInventory = 0;
		}
		this._CurrentNectarInventory = value;
	}

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

	public async CollectHoney(): Promise<number> {
		const flowers = this.mScene.GetFlowers();
		const flower = flowers[Math.floor(Math.random() * flowers.length)];

		if (flower) {
			const randX = Helper.randomIntFromInterval(-25, 25);
			const randY = Helper.randomIntFromInterval(-25, 25);
			const randX2 = Helper.randomIntFromInterval(-100, 100);
			const randY2 = Helper.randomIntFromInterval(-100, 100);

			await this.mMover.Move(flower.x + 60 + randX, flower.y + 60 + randY); // move to flower

			const nectarSuckTime = (this.MaxNectarInventory / this.NectarPerSecond) * 1000;
			await new Promise(resolve => setTimeout(resolve, nectarSuckTime)); // suck nectar

			this.CurrentNectarInventory = this.MaxNectarInventory;

			await this.mMover.Move(this.mReturnPoint.x + randX2, this.mReturnPoint.y + randY2); // move to hive

			this.DrainingNectar = true;

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
		//drains a fraction of bees nectar into the hive every frame until they have no more
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