import { TextStyle } from "pixi.js";
import {Text} from "pixi.js";
import { Component } from "./Component";
import { Actor } from "../actors/Actor";

export class FloatingTextComponent extends Component{
	private mText: Text;
	private vy: number;
	private alpha: number;
    
	constructor(owner: Actor, text: string, x: number, y: number, style: TextStyle) {
		super(owner);
		this.mText = new Text(text, style); //use bitmaptext if this is slowing the game down for some reason
		this.mText.x = x;
		this.mText.y = y;
		this.vy = -2; // Speed at which the text moves upward
		this.alpha = 1;
		owner.addChild(this.mText);
	}
  
	override Update(delta: number) {
		// Update the position and opacity based on the delta time
		this.mText.y += this.vy;
		this.alpha -= 0.02;
  
		// Apply changes to the text object
		this.mText.alpha = this.alpha;
	}
}
  