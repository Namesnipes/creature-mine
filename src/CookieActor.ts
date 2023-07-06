import { Actor } from './Actor';
import { ClickComponent } from './ClickComponent';
import { Scene } from './scenes/Scene1';
export class CookieActor extends Actor {
    private mClicker: ClickComponent = new ClickComponent(this);
    constructor(scene: Scene){
        super(scene);
        
    }

}