import { Actor } from './Actor';

class Component{
    private mOwner: Actor;
    private mUpdateOrder: number;

    constructor(owner: Actor, updateOrder: number) {
        this.mOwner = owner;
        this.mUpdateOrder = updateOrder;
        this.mOwner.AddComponent(this);
    }
    
    public Update(deltaTime: number): void {
    }
    
    public ProcessInput(keyState: Uint8Array): void {
    }
    
    public GetScene(): Game {
        return this.mOwner.GetScene();
    }
    
}