import { Actor } from "./Actor";
import { Component } from "./Component";

export class ClickComponent extends Component{
    owner: Actor;
    constructor(owner: Actor) {
        super(owner);
        this.owner = owner
        owner.interactive = true
        owner.on("pointertap", this.onClick, this);
    }

    public onClick():void{
        console.log("cookie clicked")
    }
    public override Update(delta: number): void {
    }

    public override ProcessInput(): void {
    }
}