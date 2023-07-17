import { Actor } from "../actors/Actor";
import { Component } from "./Component";
import { Point, ParticleContainer, Texture, FederatedMouseEvent, Container } from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import * as particles from '@pixi/particle-emitter';
import { Manager } from "../Manager";

export class ParticleComponent extends Component {

    public mSettings: JSON;
    public mContainer: Container;
    public mEmitter: particles.Emitter;

    constructor(owner: Actor, settings: any) {
        super(owner);
        this.mOwner = owner;
        this.mSettings = settings
    }

    /**
     * Emits a particle at the specified coordinates for a given duration.
     *
     * @param {number} x - The x-coordinate of the particle spawn position. Coordinates relative to the actor's position.
     * @param {number} y - The y-coordinate of the particle spawn position. Coordinates relative to the actor's position.
     * @param {number} duration - The duration in milliseconds for which the particle emission should be active. Omit to emit only 1 particle.
     */
    public emitParticles(x: number, y: number, duration: number = 1) {
        if (!this.mContainer) {
            this.mContainer = new Container();
            this.mOwner.addChild(this.mContainer);
        }

        if (!this.mEmitter) {
            this.mEmitter = new particles.Emitter(this.mContainer, particleSettings);
            this.mEmitter.autoUpdate = true;
        }

        this.mEmitter.updateSpawnPos(x, y);
        this.mEmitter.emitNow()
        setTimeout(() => {
            this.mEmitter.emit = false
        }, duration);
    }

    public override Update(delta: number): void {
    }

    public override ProcessInput(): void {
    }
}