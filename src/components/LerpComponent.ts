import { Helper } from "../Helper";
import { Actor } from "../actors/Actor";
import { Component } from "./Component";

export class LerpComponent extends Component {

    private mLerpPercent: number = 0;
    private isLerping: boolean = false;
    private originX: number;
    private originY: number;
    private lerpToX: number;
    private lerpToY: number;
    private lerpPromiseResolve: (value: void | PromiseLike<void>) => void;

    constructor(owner: Actor) {
        super(owner);
        this.mOwner = owner;
    }

    //TODO: add speed as a parameter to lerp
    /**
     * Uses LERP to move the actor to the specified coordinates.
     *
     * @param {number} x1 - The x-coordinate to move to.
     * @param {number} y1 - The y-coordinate to move to.
     * @return {Promise<void>} A Promise that resolves when the object has finished moving.
     */
    public Move(x1: number, y1: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.isLerping = true;
            this.originX = this.mOwner.x;
            this.originY = this.mOwner.y
            this.lerpToX = x1
            this.lerpToY = y1
            this.mLerpPercent = 0
            this.lerpPromiseResolve = resolve
        })
    }
    public override Update(delta: number): void {
        if (this.isLerping) {
            //console.log(Helper.Lerp(this.mOwner.x, this.lerpToX, this.mLerpPercent),this.mLerpPercent)
            this.mOwner.x = Helper.Lerp(this.originX, this.lerpToX, this.mLerpPercent);
            this.mOwner.y = Helper.Lerp(this.originY, this.lerpToY, this.mLerpPercent);

            this.mLerpPercent += delta / 1000; // percent is between 0 and 1
            if (this.mLerpPercent >= 1) {
                this.lerpPromiseResolve()
                this.isLerping = false
            }
        }
    }

    public override ProcessInput(): void {
    }
}