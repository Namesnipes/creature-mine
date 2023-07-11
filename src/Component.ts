import { Actor } from './Actor';
import { Scene } from './scenes/Scene1';

export class Component{
    protected mOwner: Actor;

    constructor(owner: Actor) {
        this.mOwner = owner;
        this.mOwner.AddComponent(this);
    }
    
    /**
     * Updates this component.
     *
     * @param {number} delta - the delta value to be updated
     * @return {void} undefined
     */
    public Update(delta: number): void {
        console.log(delta);
    }
    
    /**
     * Process user input.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    public ProcessInput(): void {
    }
    
    /**
     * Retrieves the scene associated with the object.
     *
     * @return {Scene} The scene associated with the object.
     */
    public GetScene(): Scene {
        return this.mOwner.GetScene();
    }
    
}
