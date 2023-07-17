import { Manager } from './Manager';
import { Scene } from './scenes/Scene1';

Manager.initialize(1600, 1000, 0x6495ed);
const loady: Scene = new Scene();
Manager.changeScene(loady);
