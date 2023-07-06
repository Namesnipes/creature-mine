import { Actor } from './scenes/Actor';
import { Scene } from './scenes/Scene';

export class Component{
    private mOwner: Actor;
    private mUpdateOrder: number;

    constructor(owner: Actor, updateOrder: number) {
        this.mOwner = owner;
        this.mUpdateOrder = updateOrder;
        this.mOwner.AddComponent(this);
    }
    
    public Update(delta: number): void {
    }
    
    public ProcessInput(): void {
    }
    
    public GetScene(): Scene {
        return this.mOwner.GetScene();
    }
    
}