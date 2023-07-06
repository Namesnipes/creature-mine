import { Manager } from './Manager';
import { Scene } from './scenes/Scene1';

Manager.initialize(1600,1000, 0x6495ed);

// We no longer need to tell the scene the size because we can ask Manager!
const loady: Scene = new Scene();
Manager.changeScene(loady);
