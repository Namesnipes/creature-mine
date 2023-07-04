import { ColorMatrixFilter, Sprite, AnimatedSprite, Container, Graphics, TextStyle, Color, Text, Ticker, Texture, FederatedPointerEvent} from 'pixi.js'
import { Keyboard } from "../Keyboard"

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    // We promoted clampy to a member of the class
    constructor(screenWidth: number, screenHeight: number) {
        super(); // Mandatory! This calls the superclass constructor.

        // see how members of the class need `this.`?
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        const CAT_URL: string = "gabe.jpg"
        const conty: Container = new Container();
        conty.x = 0;
        conty.y = 0;
        this.addChild(conty);
        
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
        clampy3.x = this.screenWidth / 2;
        clampy3.y = this.screenHeight / 2;
        clampy3.anchor.set(0,1);
        conty.addChild(clampy3);
        
        
        let chomping_down: boolean = false
        let rainbow_switch: boolean = false
        let hsl_color: number = 0
        

        Ticker.shared.add((delta) => {
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
        
        this.addChild(graphy); //I can add it before setting position, nothing bad will happen.
        
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
        
        this.addChild(texty);
        
        // Make your filter
        const colormatrix = new ColorMatrixFilter();
        
        // Add it to the `.filters` array of any DisplayObject
        clampy.filters = [colormatrix];
        colormatrix.negative(true)

        const clampyImages = [
            "Untitled1.png",
            "Untitled2.png",
            "Untitled3.png",
            "Untitled4.png",
            "Untitled5.png",
            "Untitled6.png",
            "Untitled7.png",
            "Untitled8.png",
            "Untitled9.png",
            "Untitled10.png",
            "Untitled11.png",
            "Untitled12.png"
          ];
        const textureArray = [];
        
        for (let i = 0; i < clampyImages.length; i++)
        {
            const texture = Texture.from(clampyImages[i]);
            textureArray.push(texture);
        }

        const animatedSprite = new AnimatedSprite(textureArray);
        this.addChild(animatedSprite)
        animatedSprite.animationSpeed = 0.25
        animatedSprite.play()



        
        const buttonTextures = [
            "button_up.png",
            "button_down.png",
            "button_up.png"
        ]

        const textureArray2 = [];
        
        for (let i = 0; i < buttonTextures.length; i++)
        {
            const texture = Texture.from(buttonTextures[i]);
            textureArray2.push(texture);
        }

        const button = new AnimatedSprite(textureArray2);
        button.x = this.screenWidth / 2;
        button.y = this.screenHeight / 2;
        this.addChild(button)
        button.animationSpeed = 0.05
        button.loop = true
        button.on("pointertap", this.onClicky, this);
        button.interactive = true

        Keyboard.initialize()
        Ticker.shared.add((delta) => {
            if(Keyboard.state.get("KeyW")){
                button.y = button.y - 5 * delta
            }
            if(Keyboard.state.get("KeyA")){
                button.x = button.x - 5 * delta
            }
            if(Keyboard.state.get("KeyS")){
                button.y = button.y + 5 * delta
            }
            if(Keyboard.state.get("KeyD")){
                button.x = button.x + 5 * delta
            }
        })
    }
    private onClicky(e: FederatedPointerEvent): void {
        let targ = e.target
        if(targ){
            (targ as AnimatedSprite).play()
            setTimeout(function() {
                if(targ){
                (targ as AnimatedSprite).stop()
                }
            }, 1000)
        }
    }

}
