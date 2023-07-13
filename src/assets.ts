import type { ResolverManifest } from "pixi.js";

export const manifest:ResolverManifest = {
    bundles: [
        {
            name : "MainScreen",
            assets:
            [
            {
                "name":"cookie",
                "srcs": "./cookie.png"
            },
            {
                "name":"sprites",
                "srcs": "./cookieSprites.json"
            },
            {
                "name":"cookie_bg",
                "srcs": "./cookieBackground.jpg"
            },
            {
                "name":"hive",
                "srcs": "./hive.png"
            },
            {
                "name":"bee",
                "srcs": "./bee.png"
            },
            ]
        }
    ]
}
