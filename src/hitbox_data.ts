import { Point, Polygon } from "pixi.js";

const hive_hitbox = new Polygon([new Point(259, 474), new Point(162, 471), 
	new Point(80, 458), new Point(27, 440), new Point(6, 417), new Point(1, 378), 
	new Point(16, 348), new Point(9, 300), new Point(16, 272), new Point(33, 251), 
	new Point(34, 202), new Point(50, 168), new Point(76, 145), new Point(92, 94), 
	new Point(116, 75), new Point(143, 71), new Point(191, 19), new Point(237, 2), 
	new Point(281, 2), new Point(309, 12), new Point(354, 50), new Point(379, 31), 
	new Point(426, 32), new Point(445, 48), new Point(458, 80), new Point(489, 73), 
	new Point(506, 36), new Point(529, 21), new Point(550, 18), new Point(572, 27), 
	new Point(580, 45), new Point(571, 57), new Point(551, 54), new Point(551, 31), 
	new Point(536, 29), new Point(518, 40), new Point(501, 73), new Point(537, 90), 
	new Point(582, 79), new Point(617, 100), new Point(614, 121), new Point(596, 124), 
	new Point(586, 111), new Point(590, 91), new Point(555, 92), new Point(543, 101), 
	new Point(548, 135), new Point(536, 160), new Point(568, 161), new Point(587, 171), 
	new Point(604, 197), new Point(607, 227), new Point(597, 247), new Point(563, 264), 
	new Point(530, 266), new Point(491, 253), new Point(504, 295), new Point(498, 342), 
	new Point(509, 359), new Point(507, 413), new Point(488, 430), new Point(447, 444), 
	new Point(293, 474)]);

export const hitbox_data = {
	hive: hive_hitbox
};