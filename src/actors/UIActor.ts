import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import {List, ButtonContainer } from '@pixi/ui';
import { Graphics } from 'pixi.js';
import { Manager } from '../Manager';
export class UIActor extends Actor {

    constructor(scene: Scene) {
        super(scene);
        this.MakeUI();
    }
    /**
     * Draws the UI panel.
     *
     * @private
     * @returns {void}
     */
    private MakeUI(): void{
        const list = new List({
            children: [
                new Graphics().beginFill(0xfccf03).drawRect(0, 0, Manager.width / 4, Manager.height),
                new ButtonContainer(
                    new Graphics()
                        .beginFill(0x03dffc)
                        .drawRoundedRect(0, Manager.height / 2, 200, 50, 15)
               ),
            ],
         });
         this.mScene.addChild(list);
    }
    

}