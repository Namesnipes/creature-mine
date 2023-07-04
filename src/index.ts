import { Application} from 'pixi.js'
import { Scene } from './scenes/Scene';

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
});

const sceny: Scene = new Scene(app.screen.width, app.screen.height);

app.stage.addChild(sceny)