// import { _decorator,Vec2 } from 'cc';

// export default class RVOMath
// {
//    /**一个足够小的正数 */
//     public static readonly RVO_EPSILON = 0.00001;
//    /**一个表示正无穷的数 */
//     public static readonly RVO_POSITIVEINFINITY = 10000000000000;
//     public static abs(vector: Vec2)
//     {
//         return this.sqrt(this.absSq(vector));
//     }
//     public static absSq(vector: Vec2)
//     {
//         return Vec2.multiply(vector, vector);
//     }
//     public static normalize(vector: Vec2)
//     {
//         return Vec2.division(vector, this.abs(vector));
//     }
//     public static det(vector1: Vec2, Vec2: Vec2)
//     {
//         return vector1.x * Vec2.y - vector1.y * Vec2.x;
//     }
//     public static distSqPointLineSegment(vector1: Vec2, Vec2: Vec2, vector3: Vec2)
//     {
//         let r = Vec2.multiply(Vec2.subtract(vector3, vector1), Vec2.subtract(Vec2, vector1)) / this.absSq(Vec2.subtract(Vec2, vector1));
//         if (r < 0)
//         {
//             return this.absSq(Vec2.subtract(vector3, vector1));
//         }
//         if (r > 1)
//         {
//             return this.absSq(Vec2.subtract(vector3, Vec2));
//         }
//         return this.absSq(Vec2.subtract(vector3, Vec2.addition(vector1, Vec2.multiply2(r, Vec2.subtract(Vec2, vector1)))));
//     }
//     public static fabs(scalar: number)
//     {
//         return Math.abs(scalar);
//     }
//     public static leftOf(a: Vec2, b: Vec2, c: Vec2)
//     {
//         return this.det(Vec2.subtract(a, c), Vec2.subtract(b, a));
//     }
//     public static sqr(scalar: number)
//     {
//         return scalar * scalar;
//     }
//     public static sqrt(scalar: number)
//     {
//         return Math.sqrt(scalar);
//     }
//    /**
//     * 转换单精度
//     * @param value 
//     * @returns 
//     */
//     public static transfromFloat(value: number)
//     {
//         return Math.floor(value * 10) / 10;
//     }
// }



