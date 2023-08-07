import { ObservablePoint, Sprite, Texture } from 'pixi.js';
import { Scene } from '../scenes/Scene1';
import { Component } from '../components/Component';

enum ActorState {
    Active,
    Paused,
    Destroy
}
//actor class is base for most rendered items in the game (that perform an action)
export abstract class Actor extends Sprite {
	mScene: Scene;
	mState: ActorState;
	//component array
	mComponents: Array<Component> = [];

	constructor(scene: Scene) {
		super();
		this.mState = ActorState.Active;
		this.mScene = scene;
		this.mScene.AddActor(this);
	}
	public GetPosition(): ObservablePoint {
		return this.position;
	}
	public SetPosition(point: ObservablePoint): void {
		this.position = point;
	}
	public GetRotation(): number {
		return this.rotation;
	}
	public SetRotation(rot: number): void {
		this.rotation = rot;
	}
	public GetState(): ActorState {
		return this.mState;
	}
	public SetState(state: ActorState): void {
		this.mState = state;
	}
	public GetScene(): Scene {
		return this.mScene;
	}
	//set texture
	public SetTexture(texture: Texture) {
		this.texture = texture;
	}
	/*
	public GetComponent(comp: typeof Component): unknown {
		console.log(comp);
		//return the component that matches the input type
	}*/


	/**
     * Updates the actor's components. Called every frame.
     *
     * @param {number} delta - The time elapsed since the last frame in milliseconds.
     */
	public Update(delta: number) {
		if (this.mState == ActorState.Active) {
			this.mComponents.forEach(function (c) {
				c.Update(delta);
			});
			this.OnUpdate(delta);
		}
	}
	//update this actor
	protected OnUpdate(delta: number) {
	}
	/**
     * Calls process input on each component
     *
     */
	public ProcessInput() {
		if (this.mState == ActorState.Active) {
			this.mComponents.forEach(function (c) {
				c.ProcessInput();
			});
			this.OnProcessInput();
		}
	}
	//on process input updates actor based on input
	protected OnProcessInput() {

	}
	/**
     * Adds a component to the list of components.
     *
     * @param {Component} comp - The component to be added.
     */
	public AddComponent(comp: Component) {
		this.mComponents.push(comp);
	}
	public RemoveComponent(comp: Component) {
		const index = this.mComponents.indexOf(comp, 0);
		if (index > -1) {
			this.mComponents.splice(index, 1);
		}
	}


}