import {ObservablePoint, Point, Sprite, Texture} from 'pixi.js';
import { Scene } from './Scene1';
import {Component} from '../Component';

enum ActorState{
    Active,
    Paused,
    Destroy
}
export class Actor extends Sprite {
    mScene: Scene;
    mState: ActorState;
    //component array
    mComponents: Array<Component>;

    constructor(thisScene: Scene) {
        super();
        this.mState = ActorState.Active;
        this.mScene= thisScene;
        //TODO: add actor to scene's actor vector
        this.mScene.AddActor(this);


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
    //set texture
    public SetTexture(texture: Texture){
        this.texture = texture;
    }
    // public GetForward(): Point{
    //     //x is cosine of the rotation angle
    //     //y is sine of rotation angle (must then negate due to coordinate system)
    //     let retVal: Point=
    //         new Point(Math.cos(this.rotation), (-1 * (Math.sin(this.rotation))));
    //     //normalize to be unit vector

    //     retVal.normalize();

    //     return retVal;
    // }

    
    public GetComponent(): any{

    }
    //update function updates actor's components
    public Update(delta: number){
        if(this.mState == ActorState.Active){
            this.mComponents.forEach(function(c){
                c.Update(delta);
            });
            this.OnUpdate(delta);
        }
    }
    //update actor
    private OnUpdate(delta: number){

    }
    //calls process input on each component
    public ProcessInput(){
        if(this.mState == ActorState.Active){
            this.mComponents.forEach(function(c){
                c.ProcessInput();
            });
            this.OnProcessInput();
        }
    }
    //on process input updates actor based on input
    private OnProcessInput(){

    }

    public AddComponent(comp: Component){
        this.mComponents.push(comp);
    }



}