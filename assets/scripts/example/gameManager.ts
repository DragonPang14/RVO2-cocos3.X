import { _decorator, Component, Prefab, Node, v2, instantiate, Event, Vec2, EventMouse } from 'cc';
import { commonUtils } from '../RVO/commonUtils';
const { ccclass, property } = _decorator;

import Simulator from "../RVO/Simulator";
import GameAgent from "./gameAgent";
import GameConfig from "./gameConfig";

@ccclass('GameManager')
export default class GameManager extends Component
{
    @property(Prefab)
    public agentPrefab: Prefab | null = null;
    @property(Prefab)
    public obstaclePrefab: Prefab | null = null;
    private _agentMap: { [sid: number]: GameAgent } = {};
    private _stepInterval: number = 0;
    start()
    {
        this.node.on(Node.EventType.MOUSE_DOWN, this.createObstacle, this);
        Simulator.Instance.setTimeStep(GameConfig.gameTimeStep);
        Simulator.Instance.setAgentDefaults(GameConfig.neighborDist, GameConfig.maxNeighbors, GameConfig.timeHorizon, GameConfig.timeHorizonObst,
            GameConfig.radius, GameConfig.maxSpeed, GameConfig.velocity);
        this.createAgents();
    }
    protected update(dt: number): void
    {
        Simulator.Instance.doStep();
    }
    private createAgents()
    {
        let center = v2(0, 0);
        let agentNum = GameConfig.agentCount;
        let radius = 200;
        for (let i = 0; i < agentNum; i++)
        {
            let v2 = this.getPosInCircle(360 / agentNum * i, radius, center);
            let sid = this.createAgent(v2);
            let ga = this._agentMap[sid];
            ga.targetPos = this.getPosInCircle((360 / agentNum * i) - 180, radius, center);
        }
    }
    private createAgent(position: Vec2)
    {
        if (!this.agentPrefab) return;
        let sid = Simulator.Instance.addAgent(position);
        if (sid > -1)
        {
            let node = instantiate(this.agentPrefab);
            node.name = "agent_" + sid;
            this.node.parent.addChild(node);
            node.setPosition(position.x, position.y);
            let ga = node.getComponent(GameAgent) || node.addComponent(GameAgent);
            ga.sid = sid;
            this._agentMap[sid] = ga;
        }
        return sid;
    }
    private createObstacle(event: EventMouse)
    {
        if (!this.obstaclePrefab) return;
        let parent = this.node.parent;
        let node = instantiate(this.obstaclePrefab);
        node.setPosition(commonUtils.convertVec2ToVec3(event.getLocation()));
        parent.addChild(node);
    }
   /**
    * 求圆上某角度的点的坐标
    * @param angle 
    * @param radius 
    * @param center 
    * @returns 
    */
    private getPosInCircle(angle: number, radius: number, center: Vec2)
    {
        let x = Math.floor(center.x + radius * Math.cos(angle * Math.PI / 180));
        let y = Math.floor(center.y + radius * Math.sin(angle * Math.PI / 180));
        return new Vec2(x, y);
    }
   /**科学计数法转换为10进制 */
    private transferToNumber(inputNumber)
    {
        if (isNaN(inputNumber))
        {
            return inputNumber
        }
        inputNumber = '' + inputNumber
        inputNumber = parseFloat(inputNumber)
        let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
        let tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
        let str: string = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]));
        return Number(str);
    }
}

