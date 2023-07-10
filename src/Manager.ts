import { Application, DisplayObject, Sprite, Assets} from "pixi.js";
import { manifest } from "./assets";
import { UserInput } from "./UserInput";

export class Manager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    private static initializeAssetsPromise: Promise<unknown>; 
    // Safely store variables for our game
    private static app: Application;
    private static currentScene: IScene;

    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;


    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    // Use this function ONCE to start the entire machinery
    public static async initialize(width: number, height: number, background: number): Promise<void> {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,           
            height: height
        });

        await Assets.init({ manifest: manifest });

        // Add the ticker
        Manager.app.ticker.add(Manager.update)
        
        // listen for the browser telling us that the screen size changed
        window.addEventListener("resize", Manager.resize);

        // call it manually once so we are sure we are the correct size after starting
        Manager.resize();

        UserInput.initialize()
    }

    public static resize(): void {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        console.log(horizontalMargin,verticalMargin)
        if(Manager.app.view.style){
            Manager.app.view.style.width = `${enlargedWidth}px`;
            Manager.app.view.style.height = `${enlargedHeight}px`;
            const style = Manager.app.view.style as CSSStyleDeclaration;
            style.marginRight = style.marginLeft = `${horizontalMargin}px`;
            style.marginBottom = style.marginTop = `${verticalMargin}px`;
        }
    }

    // Call this function when you want to go to a new scene
    public static async changeScene(newScene: IScene): Promise<void> {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        console.log("loading")
        await Assets.loadBundle(newScene.assetBundles);
        newScene.onAssetsLoaded()
        console.log("done")
        // Add the new one
        Manager.currentScene = newScene;

        //background for all scenes
        const bg: Sprite = Sprite.from("cookie_bg")
        bg.width = this.width
        bg.height = this.height
        Manager.app.stage.addChild(bg)
        Manager.app.stage.addChild(Manager.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed: number): void {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }

        // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
    }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    onAssetsLoaded(): void
    assetBundles:string[];
}