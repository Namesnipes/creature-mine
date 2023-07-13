import { Actor } from "../actors/Actor";
import { Component } from "./Component";
import { Point, ParticleContainer, Texture, FederatedMouseEvent, Container } from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import * as particles from '@pixi/particle-emitter';
import { Manager } from "../Manager";

export class LerpComponent extends Component {

    private mLerpPercent: number = 0;
    private isLerping: boolean = false;
    private originX: number;
    private originY: number;
    private lerpToX: number;
    private lerpToY: number;

    constructor(owner: Actor) {
        super(owner);
        this.mOwner = owner;
    }

    private Lerp(start: number, stop: number, amt: number) {
        if (amt > 1)
            amt = 1;
        else if (amt < 0)
            amt = 0;
        return start + (stop - start) * amt;
    }

    //TODO: make this a promise, send an event out when the lerp is finished
    //TODO: add speed as a parameter
    public Move(x1: number, y1: number) {
        this.isLerping = true;
        this.originX = this.mOwner.x;
        this.originY = this.mOwner.y
        this.lerpToX = x1
        this.lerpToY = y1
        this.mLerpPercent = 0
    }
public override Update(delta: number): void {

    if (this.isLerping) {
        console.log(this.Lerp(this.mOwner.x, this.lerpToX, this.mLerpPercent),this.mLerpPercent)
        this.mOwner.x = this.Lerp(this.originX, this.lerpToX, this.mLerpPercent);
        this.mOwner.y = this.Lerp(this.originY, this.lerpToY, this.mLerpPercent);
    }

    this.mLerpPercent += delta / 1000; // percent is between 0 and 1
    if(this.mLerpPercent >= 1){
        this.isLerping = false
    }
}
    public override ProcessInput(): void {
    }
}