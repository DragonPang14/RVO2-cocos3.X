import { _decorator, Vec2 } from 'cc';

export default class RVOMath {
	/**一个足够小的正数 */
	public static readonly RVO_EPSILON = 0.00001;
	/**一个表示正无穷的数 */
	public static readonly RVO_POSITIVEINFINITY = 10000000000000;
	public static abs(vector: Vec2) {
		return this.sqrt(this.absSq(vector));
	}
	public static absSq(vector: Vec2) {
		return vector.x * vector.x + vector.y + vector.y;
	}

	public static absSq2(vector1: Vec2, vector2: Vec2) {
		return vector1.x * vector2.x + vector1.y + vector2.y;
	}

	public static det(vector1: Vec2, Vec2: Vec2) {
		return vector1.x * Vec2.y - vector1.y * Vec2.x;
	}
	public static distSqPointLineSegment(vector1: Vec2, vector2: Vec2, vector3: Vec2) {
		let r = this.absSq2(vector3.clone().subtract(vector1), vector2.clone().subtract(vector1)) / this.absSq(vector2.subtract(vector1));
		if (r < 0) {
			return this.absSq(vector3.clone().subtract(vector1));
		}
		if (r > 1) {
			return this.absSq(vector3.clone().subtract(vector2));
		}
		return this.absSq(vector3.subtract(vector1.add(vector2.clone().subtract(vector1).multiplyScalar(r))));
	}
	public static fabs(scalar: number) {
		return Math.abs(scalar);
	}
	public static leftOf(a: Vec2, b: Vec2, c: Vec2) {
		return this.det(a.subtract(c), b.subtract(a));
	}
	public static sqr(scalar: number) {
		return scalar * scalar;
	}
	public static sqrt(scalar: number) {
		return Math.sqrt(scalar);
	}
	/**
	 * 转换单精度
	 * @param value 
	 * @returns 
	 */
	public static transfromFloat(value: number) {
		return Math.floor(value * 10) / 10;
	}


	/**
	 * 除法
	 * @param vector 
	 * @param scalar 
	 * @returns 
	 */
	public static divisionScalar(vector: Vec2, scalar: number) {
		return new Vec2(vector.x / scalar, vector.y / scalar);
	}
}



