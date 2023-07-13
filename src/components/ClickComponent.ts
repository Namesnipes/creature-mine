import { Actor } from "../actors/Actor";
import { Component } from "./Component";
import { Point, ParticleContainer, Texture, FederatedMouseEvent, Container } from 'pixi.js';
import * as particleSettings from "../cookemit.json";
import * as particles from '@pixi/particle-emitter';
import { Manager } from "../Manager";

export class ClickComponent extends Component {
    mClicked: boolean = false;
    mIsShrinking: boolean = true;
    mClickScale: number = 0.05;
    mClickCallback: Function;

    public mClickNum: number;

    constructor(owner: Actor, clickCallback: Function, clickNum?: number) {
        super(owner);
        this.mOwner = owner;
        this.mClickCallback = clickCallback
        if(clickNum){
            this.mClickNum = clickNum
        } else {
            this.mClickNum = 0
        }
        owner.interactive = true;
        owner.on("pointertap", this.onClick, this);
    }

    public onClick(e: FederatedMouseEvent):void{
        this.mClickCallback.bind(this.mOwner)(e)
        this.mClickNum++;
    }


    public override Update(delta: number): void {
    }

    public override ProcessInput(): void {
    }
}