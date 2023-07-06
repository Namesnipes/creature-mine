import {ObservablePoint, Sprite} from 'pixi.js';
import { Scene } from './Scene';

enum ActorState{
    Active,
    Paused,
    Destroy
}
export class Actor extends Sprite {
    mScene: Scene;
    mState: ActorState;
    //component array
    //mComponents: Array<>;

    constructor(thisScene: Scene) {
        super();
        mState: ActorState.Active;
        mScene: thisScene;
        //TODO: add actor to scene's actor vector
        //TODO: set actor position to zero

    }

    public GetPosition(): ObservablePoint {
        return this.position;
    }
    public SetPosition(point: ObservablePoint): void{
        this.position = point;
    }
    public GetRotation(): number {
        return this.rotation;
    }
    public SetRotation(rot: number): void{
        this.rotation = rot;
    }
    //TODO: get/set state
    //TODO: get scene
    //TODO: get forward direction
    //TODO: get componenet
    //TODO: update function updates actor's components
    //TODO: on update function updates actor each frame
    //TODO: calls process input on each component
    //TODO: on process input updates actor based on input
    //TODO: add component



}