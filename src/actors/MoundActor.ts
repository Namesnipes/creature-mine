import { Actor } from './Actor';
import { Scene } from '../scenes/Scene1';
import { Manager } from '../Manager';
import { FederatedEventHandler, FederatedMouseEvent, FederatedPointerEvent, Point, Polygon, Texture } from 'pixi.js';
import { ClickComponent } from '../components/ClickComponent';
import { FlowerActor } from './FlowerActor';

export class MoundActor extends Actor {
	public mClicker: ClickComponent = new ClickComponent(this, this.onClick);
	public mFlower: FlowerActor;
	constructor(scene: Scene) {
		super(scene);
		this.x = Manager.width;
		this.y = Manager.height;
		this.scale.set(0.1, 0.1);
		this.SetTexture(Texture.from('mound'));
		this.hitArea = new Polygon([new Point(929, 1531), new Point(929, 1501), new Point(689, 1501), new Point(689, 1471), new Point(449, 1471), new Point(449, 1441), new Point(329, 1441), new Point(329, 1411), new Point(269, 1411), new Point(269, 1381), new Point(239, 1381), new Point(239, 1319), new Point(269, 1319), new Point(269, 1289), new Point(299, 1289), new Point(299, 1259), new Point(329, 1259), new Point(329, 1199), new Point(359, 1199), new Point(359, 1139), new Point(389, 1139), new Point(389, 1109), new Point(419, 1109), new Point(419, 1021), new Point(389, 1021), new Point(389, 989), new Point(421, 989), new Point(421, 1019), new Point(451, 1019), new Point(451, 1049), new Point(479, 1049), new Point(479, 989), new Point(509, 989), new Point(509, 929), new Point(539, 929), new Point(539, 899), new Point(569, 899), new Point(569, 869), new Point(629, 869), new Point(629, 839), new Point(689, 839), new Point(689, 809), new Point(719, 809), new Point(719, 749), new Point(749, 749), new Point(749, 689), new Point(779, 689), new Point(779, 659), new Point(839, 659), new Point(839, 629), new Point(869, 629), new Point(869, 599), new Point(991, 599), new Point(991, 629), new Point(1049, 629), new Point(1049, 599), new Point(1141, 599), new Point(1141, 629), new Point(1171, 629), new Point(1171, 659), new Point(1201, 659), new Point(1201, 689), new Point(1231, 689), new Point(1231, 749), new Point(1261, 749), new Point(1261, 809), new Point(1291, 809), new Point(1291, 839), new Point(1321, 839), new Point(1321, 899), new Point(1351, 899), new Point(1351, 929), new Point(1381, 929), new Point(1381, 959), new Point(1411, 959), new Point(1411, 989), new Point(1441, 989), new Point(1441, 1049), new Point(1471, 1049), new Point(1471, 1109), new Point(1499, 1109), new Point(1499, 1079), new Point(1529, 1079), new Point(1529, 1049), new Point(1561, 1049), new Point(1561, 1081), new Point(1531, 1081), new Point(1531, 1169), new Point(1561, 1169), new Point(1561, 1229), new Point(1621, 1229), new Point(1621, 1259), new Point(1651, 1259), new Point(1651, 1289), new Point(1681, 1289), new Point(1681, 1381), new Point(1621, 1381), new Point(1621, 1411), new Point(1561, 1411), new Point(1561, 1441), new Point(1411, 1441), new Point(1411, 1471), new Point(1321, 1471), new Point(1321, 1501), new Point(1201, 1501), new Point(1201, 1531)]);
	}

	public onClick(e: FederatedMouseEvent): void {
		console.log("clicked mound");

		if (!this.mFlower) {
			this.mFlower = new FlowerActor(this.mScene);
			this.mFlower.x = this.x + this.width / 5;
			this.mFlower.y = this.y - this.mFlower.height / 2;
			this.mScene.addChild(this.mFlower);
		}
	}
}