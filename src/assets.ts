/* eslint-disable no-mixed-spaces-and-tabs */
import type { ResolverManifest } from "pixi.js";

export const manifest:ResolverManifest = {
	bundles: [
		{
			name : "MainScreen",
			assets:
            [{
            	"name":"cookie",
            		"srcs": "./cookie.png"
            	},
            	{
            		"name":"sprites",
            		"srcs": "./cookieSprites.json"
            	},
            	{
            		"name":"field_bg",
            		"srcs": "./field.jpg"
            	},
            	{
            		"name":"hive",
            		"srcs": "./hive.png"
            	},
            	{
            		"name":"bee",
            		"srcs": "./bee.png"
            	},
            	{
            		"name":"flower",
            		"srcs": "./flower.png"
            	},
            	{
            		"name":"mound",
            		"srcs": "./mound.png"
            	},
				{
            		"name":"jar",
            		"srcs": "./jar.png"
            	},
				{
            		"name":"honey",
            		"srcs": "./honey.png"
            	},
				{
            		"name":"wood",
            		"srcs": "./wood.jpg"
            	},
            ]
		}
	]
};
