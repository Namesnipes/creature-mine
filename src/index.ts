import { Application, Sprite, Container, Color } from 'pixi.js'

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

const clampy3: Sprite = Sprite.from(CAT_URL);
clampy3.x = app.screen.width / 2;
clampy3.y = app.screen.height / 2;
clampy3.anchor.set(0,1);
conty.addChild(clampy3);


let chomping_down: boolean = false
let rainbow_switch: boolean = false
let hsl_color: number = 0

app.ticker.add((delta) => {
    if(clampy2.angle >= 45){
        chomping_down = true
    } else if(clampy2.angle <= 0) {
        chomping_down = false
    }

    clampy.angle += chomping_down ? 2.5 * delta : -2.5 * delta;
    clampy2.angle += chomping_down ? -2.5 * delta : 2.5 * delta;

    if(hsl_color >= 255) hsl_color = 0
    clampy3.tint = new Color('hsl(' + (rainbow_switch ? hsl_color += 2 : hsl_color -= 2) + ', 100%, 80%, 50%)')
});
//test