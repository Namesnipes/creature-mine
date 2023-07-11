export class UserInput {
    public static state: Map<string, boolean> = new Map<string, boolean>();
    
    /**
     * Initializes the user input event listeners.
     *
     * @return {none}
     */
    public static initialize() {
        document.addEventListener("keydown", UserInput.keyDown);
        document.addEventListener("keyup", UserInput.keyUp);
        document.addEventListener("mousedown", UserInput.mouseDown)
        document.addEventListener("mouseup", UserInput.mouseUp)
    }
    private static keyDown(e: KeyboardEvent): void {
        UserInput.state.set(e.code, true)
    }
    private static keyUp(e: KeyboardEvent): void {
        UserInput.state.set(e.code, false)
    }

    private static mouseDown(e: MouseEvent): void{
        if (e.button === 0) { //right mouse button
            UserInput.state.set("RMouse", false)
        } else if (e.button === 1) {  // wheel or middle button
            UserInput.state.set("MMouse", false)
        } else if (e.button === 2) {  // right mouse button
            UserInput.state.set("RMouse", false)
        } else if (e.button === 3) {  // browser back button
            UserInput.state.set("BMouse", false)
        } else if (e.button === 4) {  // browser forward button
            UserInput.state.set("FMouse", false)
        }
    }

    private static mouseUp(e: MouseEvent): void{
        if (e.button === 0) { //right mouse button
            UserInput.state.set("RMouse", true)
        } else if (e.button === 1) {  // wheel or middle button
            UserInput.state.set("MMouse", true)
        } else if (e.button === 2) {  // right mouse button
            UserInput.state.set("RMouse", true)
        } else if (e.button === 3) {  // browser back button
            UserInput.state.set("BMouse", true)
        } else if (e.button === 4) {  // browser forward button
            UserInput.state.set("FMouse", true)
        }
    }
}
