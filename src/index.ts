import { Application, Sprite, Container } from 'pixi.js'

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
  autoDensity: true,
    backgroundColor: 0x6495ed,
    width: 640,
    height: 480
});

const CAT_URL: string = "gabe.jpg"
const conty: Container = new Container();
conty.x = 0;
conty.y = 0;
app.stage.addChild(conty);

const clampy: Sprite = Sprite.from(CAT_URL);
clampy.x = 100;
clampy.y = 200;
clampy.anchor.set(0,1);
conty.addChild(clampy);

const clampy2: Sprite = Sprite.from(CAT_URL);
clampy2.x = 100;
clampy2.y = 200;
clampy2.angle = 0
clampy2.anchor.set(0,0);
conty.addChild(clampy2);

let chomping_down: boolean = false

app.ticker.add((delta) => {
    if(clampy2.angle >= 45){
        chomping_down = true
    } else if(clampy2.angle <= 0) {
        chomping_down = false
    }

    clampy.angle += chomping_down ? 0.5 * delta : -0.5 * delta;
    clampy2.angle += chomping_down ? -0.5 * delta : 0.5 * delta;
});
