import { Actor } from './scenes/Actor';
import { Scene } from './scenes/Scene1';

export class Component{
    private mOwner: Actor;

    constructor(owner: Actor) {
        this.mOwner = owner;
        this.mOwner.AddComponent(this);
    }
    
    public Update(delta: number): void {
        console.log("component log, delta: " + delta);
    }
    
    public ProcessInput(): void {
    }
    
    public GetScene(): Scene {
        return this.mOwner.GetScene();
    }
    
}