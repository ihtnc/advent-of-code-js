import type { Behaviour, GCD, InputData, Segment, Coefficient } from './types';

type Fn = ({ behaviours }: InputData) => Promise<bigint>;

const solution: Fn = async ({ behaviours }) => {
  let total = 0n;

  const tasks = [];
  for (const behaviour of behaviours) {
    tasks.push(findOptimalTokens(behaviour, 100)
      .then((tokens) => total += tokens)
    );
  }

  await Promise.all(tasks);
  return total;
};

type FindFn = (behaviour: Behaviour, max?: number | bigint) => Promise<bigint>;

const findOptimalTokens: FindFn = async (behaviour, max) => {
  const promise = new Promise<bigint>((resolve) => {
    setTimeout(async () => {
      const { a, b, target } = behaviour;

      // get a segment that represents the linear equation:
      //   a * a0 + b * b0 = target
      //   for both the x and y coordinates of each button
      // if the segment (or linear equation) does not exist,
      //   the target is not reachable from any combinations of a and b
      const fx = getSegment(a.x, b.x, target.x);
      const fy = getSegment(a.y, b.y, target.y);
      if (!fx || !fy) { return resolve(0n); }

      // find the intersection between the two segments
      // if the intersection does not exist,
      //   there are no common values between the linear equations
      // this means that the target for each coordinate is only reachable
      //   when considering the x and y coordinates separately
      const optimal = findIntersection(fx, fy);
      if (!optimal) { return resolve(0n); }
      if (max && (optimal.a0 > max || optimal.b0 > max)) { return resolve(0n); }
      if (optimal.a0 < 0n || optimal.b0 < 0n) { return resolve(0n); }

      // ensure both linear equations are still valid at the intersection point
      const validx = a.x * optimal.a0 + b.x * optimal.b0 === target.x;
      const validy = a.y * optimal.a0 + b.y * optimal.b0 === target.y;
      if (!validx || !validy) { return resolve(0n); }

      const awgt = 3n;
      const bwgt = 1n;
      const weight = optimal.a0 * awgt + optimal.b0 * bwgt;

      resolve(weight);
    });
  });

  return promise;
}

type SegmentFn = (a: bigint, b: bigint, target: bigint) => Segment | null;

const getSegment: SegmentFn = (a, b, target)=> {
  const result = extendedGCD(a, b);
  if (target % result.gcd !== 0n) { return null; }

  // a0 and b0 in extended GCD satisfies the equation:
  //   a * a0 + b * b0 = gcd(a, b)
  const { gcd, coefficient } = result;
  const { a0, b0 } = coefficient;
  const factor = target / gcd;

  // k is an arbitrary integer to represent a point in the linear equation:
  //   a * a0 + b * b0 = target
  // each value of k will result to a valid combination of a0 and b0
  //   that satisfies the linear equation
  const geta = (k: bigint) => a0 * factor + (b / gcd) * k;
  const getb = (k: bigint) => b0 * factor - (a / gcd) * k;

  // get two points to complete a segment
  const point1 = { a0: geta(0n), b0: getb(0n) };
  const point2 = { a0: geta(1n), b0: getb(1n) };

  return { point1, point2 };
};

type ExtGCDFn = (a: bigint, b: bigint) => GCD;

const extendedGCD: ExtGCDFn = (a, b) => {
  if (b === 0n) {
    return {
      gcd: a,
      coefficient: { a0: 1n, b0: 0n, },
    };
  }
  const { gcd, coefficient } = extendedGCD(b, a % b);
  const { a0, b0 } = coefficient;
  return {
    gcd,
    coefficient: {
      a0: b0,
      b0: a0 - a / b * b0,
    },
  };
}

type FindIntersectionFn = (segment1: Segment, segment2: Segment) => Coefficient | null;

const findIntersection: FindIntersectionFn = (segment1, segment2) => {
  const { point1: p1, point2: p2 } = segment1;
  const { point1: p3, point2: p4 } = segment2;

  const { a0: x1, b0: y1 } = p1;
  const { a0: x2, b0: y2 } = p2;
  const { a0: x3, b0: y3 } = p3;
  const { a0: x4, b0: y4 } = p4;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator === 0n) { return null; }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  const x = x1 + t * (x2 - x1);
  const y = y1 + t * (y2 - y1);

  return { a0: x, b0: y };
};

export { solution, findOptimalTokens };