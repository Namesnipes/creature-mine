import { Actor } from "./Actor";
import { Component } from "./Component";
import { Point, ParticleContainer, Texture, FederatedMouseEvent, Container } from 'pixi.js';
import * as particleSettings from "./cookemit.json";
import * as particles from '@pixi/particle-emitter';
import { Manager } from "./Manager";

export class ClickComponent extends Component {
    mClicked: boolean = false;
    mIsShrinking: boolean = true;
    mClickScale: number = 0.05;
    public mClickNum: number = 0;
    constructor(owner: Actor) {
        super(owner);
        this.mOwner = owner;
        owner.interactive = true;
        owner.on("pointertap", this.onClick, this);
    }

<<<<<<< Updated upstream
    public onClick(e: FederatedMouseEvent):void{
        if(!this.mClicked){
            const particleContainer = new Container();
            this.mOwner.addChild(particleContainer);
            const emitter = new particles.Emitter(particleContainer,particleSettings);
            emitter.autoUpdate = true;
            emitter.updateSpawnPos(e.globalX-Manager.width/2, e.globalY-Manager.height/2);
            emitter.emit = true;
            setTimeout(function(){
                emitter.emit = false
            },500);
            
=======
    public onClick(e: FederatedMouseEvent): void {
        if (!this.mClicked) {
            const particleContainer = new ParticleContainer();
            this.mOwner.addChild(particleContainer);

            const emitter = new particles.Emitter(particleContainer, {
                lifetime: { min: 0.1, max: 1 },
                frequency: 0.01,
                spawnChance: 1,
                particlesPerWave: 1,
                emitterLifetime: 120,
                maxParticles: 10,
                pos: { x: 327, y: 200 },
                autoUpdate: true,
                behaviors: [
                    {
                        type: 'scale',
                        config: {
                            scale: {
                                list: [
                                    {
                                        value: 0.2,
                                        time: 0
                                    },
                                    {
                                        value: 0.1,
                                        time: 1
                                    }
                                ],
                            },
                        }
                    },
                    {
                        type: 'spawnShape',
                        config: { type: 'torus', data: { x: 0, y: 0, radius: 50 } },
                    },
                    { type: 'textureSingle', config: { texture: "cookie.png" } },
                ],
            });
            emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
            emitter.updateSpawnPos(e.globalX - Manager.width / 2, e.globalY - Manager.height / 2);
            emitter.emit = true;
            setTimeout(function () {
                emitter.emit = false;
            }, 500);

>>>>>>> Stashed changes
            this.mClicked = true;
            this.mClickNum++;
        }
    }


    public override Update(delta: number): void {
        if (this.mClicked) {
            if (this.mIsShrinking) {
                this.mOwner.scale = new Point(this.mOwner.scale.x - this.mClickScale, this.mOwner.scale.y - this.mClickScale);
                if (this.mOwner.scale.x - this.mClickScale <= 0.6) {
                    this.mIsShrinking = false;
                }
            }
            else {
                this.mOwner.scale = new Point(this.mOwner.scale.x + this.mClickScale, this.mOwner.scale.y + this.mClickScale);
                if (this.mOwner.scale.x + this.mClickScale >= 1) {
                    this.mClicked = false;
                    this.mIsShrinking = true;
                }
            }
        }
    }

    public override ProcessInput(): void {
    }
}