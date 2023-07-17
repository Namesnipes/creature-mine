import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Container, Point, Texture } from 'pixi.js';
import { LerpComponent } from '../components/LerpComponent';

export class BeeActor extends Actor {
    private mMover: LerpComponent = new LerpComponent(this);
    private mMiddle: Boolean = true;
    private mReturnPoint: Point;

    constructor(scene: Scene, parent?: Container) {
        super(scene);

        // if there is a parent, add this actor to the children of the parent
        if (typeof parent !== "undefined") {
            parent?.addChild(this)
        }

        this.anchor.set(0.5);
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
        this.mReturnPoint = new Point(x, y)
    }

    /**
     * Collects honey from a random flower and returns to their return point
     *
     * @return {Promise<void>} A promise that resolves when the bee has returned to its return point for 5 seconds.
     */
    public async CollectHoney() {
        return new Promise<void>(async (resolve, reject) => {

            let flowers = this.mScene.GetFlowers();
            let flower = flowers[Math.floor(Math.random() * flowers.length)];
            await this.mMover.Move(flower.x, flower.y);
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));

            await this.mMover.Move(this.mReturnPoint.x, this.mReturnPoint.y)
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
            resolve();
        })
    }

}