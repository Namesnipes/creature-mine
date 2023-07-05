import { Manager } from './Manager';
import { Scene } from './scenes/Scene';

Manager.initialize(640, 480, 0x6495ed);

// We no longer need to tell the scene the size because we can ask Manager!
const loady: Scene = new Scene();
Manager.changeScene(loady);
