import { _decorator, Component, Label, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import RVOMath from "../RVO/RVOMath";
import Simulator from "../RVO/Simulator";

@ccclass('GameAgent')
export default class GameAgent extends Component
{
    private _sid: number = -1;
    public set sid(val: number)
    {
        this._sid = val;
        this._sidLab.string = val + "";
    }
    public targetSid: number = -1;
    public targetPos: Vec2;
    private _sidLab: Label;
    onLoad()
    {
        this._sidLab = this.node.getChildByName("sid").getComponent(Label);
    }
    update(dt)
    {
        if (this._sid > -1)
        {
            let pos: Vec2 = Simulator.Instance.getAgentPosition(this._sid);
            let vel: Vec2 = Simulator.Instance.getAgentPrefVelocity(this._sid);
            if (!Number.isNaN(pos.x) && !Number.isNaN(pos.y))
            {
                this.node.setPosition(pos.x, pos.y);
            } else
            {
                console.log(`sid=${this._sid}的对象PosX=${pos.x},PosY=${pos.y}`);
            }
        }
        this.updatePrefVelocity();
    }
    public updatePrefVelocity()
    {
        if (this.targetPos != null)
        {
            let curPos = Simulator.Instance.getAgentPosition(this._sid);
            let targetPos = this.targetPos;
            let goalVector = targetPos.subtract(curPos);
            if (RVOMath.absSq(goalVector) > 1)
            {
                goalVector = goalVector.clone().normalize();
            }
            Simulator.Instance.setAgentPrefVelocity(this._sid, goalVector);
           //由于完美对称，稍微扰动一下以避免死锁,但是不注释坐标始终会有变化
           // let angle = Math.random() * 2.0 * Math.PI;
           // let dist = Math.random() * 0.1;
           // Simulator.Instance.setAgentPrefVelocity(this._sid, Vec2.addition(Simulator.Instance.getAgentPrefVelocity(this._sid),
           //     Vec2.multiply2(dist, new Vec2(Math.cos(angle), Math.sin(angle)))));
        }
    }
}

