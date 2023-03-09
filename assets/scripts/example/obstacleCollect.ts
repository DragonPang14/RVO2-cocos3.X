import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import Simulator from "../RVO/Simulator";
// /**障碍物 */

@ccclass('ObstacleCollect')
export default class ObstacleCollect extends Component {
    protected onLoad(): void {
        // let childs = this.node.children;
        // for (let i = 0, j = childs.length; i < j; i++) {
        // let node = childs[i];
        // let pos = this.node.convertToWorldSpaceAR(node.position);
        // pos = this.node.parent.convertToNodeSpaceAR(pos);
        // let widthHalf = node.width >> 1;
        // let heightHalf = node.height >> 1;
        // let minX = pos.x - widthHalf;
        // let maxX = pos.x + widthHalf;
        // let minY = pos.y - heightHalf;
        // let maxY = pos.y + heightHalf;

        // let obstacle: Array<Vec2> = [];
        // obstacle[obstacle.length] = new Vec2(maxX, maxY);
        // obstacle[obstacle.length] = new Vec2(minX, maxY);
        // obstacle[obstacle.length] = new Vec2(minX, minY);
        // obstacle[obstacle.length] = new Vec2(maxX, minY);
        // Simulator.Instance.addObstacle(obstacle);
        // }
        // Simulator.Instance.processObstacles();
    }
}

