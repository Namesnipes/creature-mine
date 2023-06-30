import { Application, Sprite, Container, Color, Graphics, TextStyle, Text} from 'pixi.js'

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


// dont clear() and redrew 
// dont use coordinate arguments in drawShape(x, y, 25) to set position. draw then do shape.x = num

const graphy: Graphics = new Graphics();

// we give instructions in order. begin fill, line style, draw circle, end filling
graphy.beginFill(0xFFFF0F);
graphy.lineStyle(10, 0xFFFFF0);
graphy.drawCircle(0, 0, 25); // See how I set the drawing at 0,0? NOT AT 100, 100!
graphy.endFill();

app.stage.addChild(graphy); //I can add it before setting position, nothing bad will happen.

// Here we set it at 100,100
graphy.x = 400;
graphy.y = 400;



const styly: TextStyle = new TextStyle({
    align: "justify",
    fill: "#754c24",
    fontSize: 42
});
const texty: Text = new Text('私に気づいて先輩！', styly); // Text supports unicode!
texty.x = 150

app.stage.addChild(texty);

