import { Manager } from './Manager';
import { IScene } from './scenes/IScene';
import { Scene } from './scenes/Scene1';

Manager.initialize(1600, 1000, 0x6495ed);
const loady: IScene = new Scene();
Manager.changeScene(loady);
