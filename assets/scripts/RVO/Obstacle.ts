import { _decorator, Vec2 } from 'cc';

export default class Obstacle
{
    public next_: Obstacle;
    public previous_: Obstacle;
    public direction_: Vec2;
    public point_: Vec2;
    public id_: number;
    public convex_: boolean;
}



