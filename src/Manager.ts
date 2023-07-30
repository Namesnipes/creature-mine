import { Application, Sprite, Assets } from "pixi.js";
import { manifest } from "./assets";
import { UserInput } from "./UserInput";
import { IScene } from './scenes/IScene';
import { DataHandler } from "./DataHandler";
import { LoadingScene } from "./scenes/LoadingScene";

export class Manager {
	private constructor() { /* static class no constructor */ }

	//used to check when the Asset Manager is initialized
	private static initializeAssetsPromise: Promise<unknown>;

	private static app: Application;
	private static currentScene: IScene;

	public static dataHandler: DataHandler;


	private static _width: number;
	private static _height: number;
	public static get width(): number {
		return Manager._width;
	}
	public static get height(): number {
		return Manager._height;
	}


	/**
     * Initializes the PIXI application.
     *
     * @param {number} width - The width of the game screen.
     * @param {number} height - The height of the game screen.
     * @param {number} background - The background color of the game screen.
     * @return {void}
     */
	public static initialize(width: number, height: number, background: number): void {

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

		this.dataHandler = new DataHandler();
		Manager.initializeAssetsPromise = Assets.init({ manifest: manifest });

		// Calls the update function every frame
		Manager.app.ticker.add(Manager.update);

		// Runs the resize function when screen size changes
		window.addEventListener("resize", Manager.resize);

		// Call the resize function manually to ensure correct size after starting
		Manager.resize();

		// create the map for storing key states
		UserInput.initialize();
	}


	/**
     * Resizes the game screen to fit the current screen size.
     *
     * @return {void} 
     */
	public static resize(): void {
		// current screen size
		const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		// uniform scale for our game
		const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

		// the "uniformly englarged" size for our game
		const enlargedWidth = Math.floor(scale * Manager.width);
		const enlargedHeight = Math.floor(scale * Manager.height);

		// margins for centering the game screen
		const horizontalMargin = (screenWidth - enlargedWidth) / 2;
		const verticalMargin = (screenHeight - enlargedHeight) / 2;

		// Set sizes and margins with css
		if (Manager.app.view.style) {
			Manager.app.view.style.width = `${enlargedWidth}px`;
			Manager.app.view.style.height = `${enlargedHeight}px`;
			const style = Manager.app.view.style as CSSStyleDeclaration;
			style.marginRight = style.marginLeft = `${horizontalMargin}px`;
			style.marginBottom = style.marginTop = `${verticalMargin}px`;
		}
	}

	/**
     * Change the current scene to a new scene. Waits for all asset bundles to be loaded before changing.
     *
     * @param {IScene} newScene - The new scene to be set.
     * @return {Promise<void>}
     */
	public static async changeScene(newScene: IScene): Promise<void> {
		// Remove and destroy old scene if we have one
		if (Manager.currentScene) {
			Manager.app.stage.removeChild(Manager.currentScene);
			Manager.currentScene.destroy();
		}

		if(newScene.assetBundles){
			const Loading_Screen = new LoadingScene();
			this.changeScene(Loading_Screen);
			console.log("Loading assets for bundles: ", newScene.assetBundles);
			await this.initializeAssetsPromise;
			await Assets.loadBundle(newScene.assetBundles, Loading_Screen.testcallback.bind(Loading_Screen));
			newScene.OnAssetsLoaded();
			console.log("Done loading bundles");
		} else {
			console.log("loading screen");
		}

		Manager.currentScene = newScene;

		// Add the new scene
		Manager.app.stage.addChild(Manager.currentScene);
	}

	/**
     * The main update function, calls the update function of the current scene.
     *
     * @param {number} framesPassed - The number of frames that have passed.
     * @return {void}
     */
	private static update(framesPassed: number): void {
		if (Manager.currentScene) {
			Manager.currentScene.update(framesPassed);
		}
	}
}