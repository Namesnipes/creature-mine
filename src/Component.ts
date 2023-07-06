import { Actor } from './Actor';
import { Scene } from './scenes/Scene1';

export class Component{
    protected mOwner: Actor;

    constructor(owner: Actor) {
        this.mOwner = owner;
        this.mOwner.AddComponent(this);
    }
    
    public Update(delta: number): void {
        console.log(delta)
    }
    
    public ProcessInput(): void {
    }
    
    public GetScene(): Scene {
        return this.mOwner.GetScene();
    }
    
}
