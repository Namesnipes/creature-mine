import {ObservablePoint, Point, Sprite} from 'pixi.js';
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
    public GetState(): ActorState {
        return this.mState;
    }
    public SetState(state: ActorState): void{
        this.mState = state;
    }
    public GetScene(): Scene {
        return this.mScene;
    }
    public GetForward(): Point{
        //x is cosine of the rotation angle
        //y is sine of rotation angle (must then negate due to coordinate system)
        retVal: Point=
            new Point(Math.cos(this.rotation), (-1 * (Math.sin(this.rotation))));
        //normalize to be unit vector
        //retVal.Normalize();
        retVal.normalize();

        return retVal;
    }
    //TODO: get forward direction
    //TODO: get componenet
    //TODO: update function updates actor's components
    //TODO: on update function updates actor each frame
    //TODO: calls process input on each component
    //TODO: on process input updates actor based on input
    //TODO: add component



}