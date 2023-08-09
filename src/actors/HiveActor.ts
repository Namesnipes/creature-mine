import { Actor } from './Actor';
import { ClickComponent } from '../components/ClickComponent';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { FederatedMouseEvent, Point, Polygon, Rectangle, TextStyle, Texture } from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import { ParticleComponent } from '../components/ParticleComponent';
import { FloatingTextComponent } from '../components/FloatingTextComponent';
import { BeeActor } from './BeeActor';
import { hitbox_data } from '../hitbox_data';

export class HiveActor extends Actor {
	public mClicker: ClickComponent = new ClickComponent(this, this.onClick, <number>Manager.dataHandler.GetData("honey"));
	private mEmitter: ParticleComponent = new ParticleComponent(this, particleSettings);
	private floatingTextStyle: TextStyle = new TextStyle({
		fontFamily: "Arial",
		fontSize: 60,
		fill: "yellow",
		dropShadow: true,
		dropShadowColor: "black",
		dropShadowBlur: 4,
		dropShadowDistance: 2,
	});

	constructor(scene: Scene) {
		super(scene);
		this.SetTexture(Texture.from('hive'));
		this.scale.set(0.5, 0.5);

		// set position to top right of screen
		this.x = Manager.width - this.width;
		this.y = 0;
		this.hitArea = hitbox_data.hive;
	}
	public onClick(e: FederatedMouseEvent): void {
		this.AddHoney();
		this.mEmitter.emitParticles(e.getLocalPosition(this).x, e.getLocalPosition(this).y);
		this.MakeBee();
		new FloatingTextComponent(this,"+1 honey", e.getLocalPosition(this).x, e.getLocalPosition(this).y, this.floatingTextStyle);
	}

	/**
     * Creates a new BeeActor and adds it to the scene. Makes it start working
     *
     * @returns {void} 
     */
	public MakeBee() {
		const bee: BeeActor = new BeeActor(this.mScene, this);
		this.mScene.addChild(bee);
		bee.zIndex = 100;
		bee.scale.set(0.05, 0.05);
		bee.SetReturnPoint(this.x + this.width / 2, this.y + this.height / 2);
		this.StartWorking(bee);
	}

	/**
     * Makes a bee start collecting honey.
     *
     * @param {BeeActor} b - The BeeActor to start working for.
     */
	public async StartWorking(b: BeeActor) {
		const collectedHoney: number = await b.CollectHoney();
		this.StartWorking(b);
	}

	
	/**
	 * Adds honey to the current amount of honey.
	 *
	 * @param {number} amount - The amount of honey to add. Defaults to 1.
	 */
	public AddHoney(amount: number = 1) {
		const currentHoney: number = <number>Manager.dataHandler.GetData("honey");
		Manager.dataHandler.SetData("honey", (currentHoney + amount) as number);
	}

	public override OnUpdate(){
		
	}
}