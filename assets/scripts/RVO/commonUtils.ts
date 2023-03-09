import { _decorator, Node, Vec2, Vec3, find, View, tween, Tween } from "cc";
const { ccclass, property } = _decorator;

export enum CoordinateUnit {
    X = "X",
    Y = "Y",
    Z = "Z",
}

export enum Degree {
    MAX = "MAX",
    MIN = "MIN",
    MID = "MID",
}

export enum DamageType {
    NORMAL = "NORMAL", // 普通伤害
    BOOM = "BOOM", // 炸弹伤害
    DISAPPEAR = "DISAPPEAR", // 消失
}

@ccclass("commonUtils")
export class commonUtils {
    //敌人池
    static enemyPool: Map<string, Node> = new Map();

    //敌人种类
    static enemyTypeList: string[] = [
        "Enemy_bat",
        "Zombie",
        "ZombieWorker",
        "Enemy_RNG",
        "Zombie_Dog",
        "xizhuangjiangshi",
        "shibingjiangshi",
        "shirenhua",
        "dagangya",
        "tunshizhe",
        "Item_Box",
        "Enemy_Butterfly_Blue",
    ];

    public static getRandomInteger(min: number, max: number): number {
        return min + Math.round(Math.random() * (max - min));
    }

    public static getRandomNum(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

    public static getRandomBinary(): number {
        return Math.random() > 0.5 ? 1 : -1;
    }

    public static convertVec3ToVec2(source: Vec3): Vec2 {
        return new Vec2(source.x, source.y);
    }

    public static convertVec2ToVec3(source: Vec2): Vec3 {
        return new Vec3(source.x, source.y, 0);
    }

    /**
     * @description 返回目标坐标周围的随机位置
     * @param target
     * @param randomRate
     * @returns
     */
    public static getRandomVec3AroundTarget(target: Vec3, randomRate: number): Vec3 {
        let x = target.x + this.getRandomNum(-randomRate, randomRate);
        let y = target.y + this.getRandomNum(-randomRate, randomRate);
        let newPos = new Vec3(x, y);
        return newPos;
    }

    public static getRandomVec3AroundTargetSpecify(target: Vec3, randomRate: number, coordinate: CoordinateUnit) {
        let x = target.x;
        let y = target.y;
        if (coordinate == CoordinateUnit.X) {
            x += this.getRandomNum(-randomRate, randomRate);
        }
        if (coordinate == CoordinateUnit.Y) {
            y += this.getRandomNum(-randomRate, randomRate);
        }

        let newPos = new Vec3(x, y);
        return newPos;
    }

    public static radianConvertToAngle(radian: number) {
        return (radian * 180) / Math.PI;
    }

    public static angleConvertToRadian(angle: number) {
        return (angle * Math.PI) / 180;
    }

    //返回角度(以弧度方式)
    public static getradian(aroundBodyPos: Vec3, centerPos: Vec3): number {
        return Math.atan2(aroundBodyPos.y - centerPos.y, aroundBodyPos.x - centerPos.x);
    }

    /**
     * Returns 在圆形范围内的enemy数组.
     * @param centerWorldPos 圆心的世界坐标.
     * @param radius 半径.
     */
    public static findEnemiesInCircle(centerWorldPos: Vec3, radius: number) {
        let enemies = new Array<Node>();

        this.enemyPool.forEach((e) => {
            let distance = centerWorldPos.clone().subtract(e.getWorldPosition());
            if (Vec3.len(distance) <= radius) {
                // console.log("enemy ",e.uuid," in circle", e.getWorldPosition(), distance, centerWorldPos, radius);
                enemies.push(e);
            }
        });

        return enemies;
    }

    /**
     * @desc 二阶贝塞尔
     * @param {number} duration 缓动时长
     * @param {Vec3} p1 起点坐标
     * @param {Vec3} cp 控制点
     * @param {Vec3} p2 终点坐标
     * @param {string} targetType 目标类型，用于onUpdate中增加逻辑判断操作
     * @param {object} opts 缓动事件
     * @returns {any}
     */
    public static bezierTo(target: any, duration: number, p1: Vec3, cp: Vec3, p2: Vec3, targetType: string, opts?: any): Tween<any> {
        opts = opts || Object.create(null);
        let twoBezier = (t: number, p1: Vec3, cp: Vec3, p2: Vec3) => {
            let x = (1 - t) * (1 - t) * p1.x + 2 * t * (1 - t) * cp.x + t * t * p2.x;
            let y = (1 - t) * (1 - t) * p1.y + 2 * t * (1 - t) * cp.y + t * t * p2.y;
            let z = (1 - t) * (1 - t) * p1.z + 2 * t * (1 - t) * cp.z + t * t * p2.z;
            return new Vec3(x, y, z);
        };
        opts.onUpdate = (_arg: Vec3, ratio: number) => {
            let newPos = twoBezier(ratio, p1, cp, p2);
            //旋转导弹方向
            if (targetType == "rocket") {
                let radian = commonUtils.getradian(newPos, target.worldPosition.clone());
                let angle = commonUtils.radianConvertToAngle(radian);
                target.angle = angle - 90;
            }
            target.worldPosition = newPos;
        };
        return tween(target).to(duration, {}, opts);
    }

    public static formatDamageNumber(damage: number): string {
        let damageStr = damage.toString();
        if (damageStr.indexOf(".") != -1) {
            //截取整数部分
            console.log(damageStr);
            damageStr = damageStr.split(".")[0];
            console.log(damageStr);
        }
        if (damageStr.length >= 7) {
            //伤害过百万
            damageStr = damageStr.substring(0, damageStr.length - 7) + "M";
        } else if (damageStr.length >= 4) {
            //伤害过千
            damageStr = damageStr.substring(0, damageStr.length - 4) + "K";
        }
        return damageStr;
    }
}
