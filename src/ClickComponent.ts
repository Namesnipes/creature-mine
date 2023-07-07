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