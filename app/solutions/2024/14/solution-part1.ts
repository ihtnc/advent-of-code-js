import type { Robot, InputData, Size } from './types';
import { copy } from './utilities';

type Fn = ({ robots }: InputData, mapSize: Size) => Promise<number>;

const solution: Fn = async ({ robots: data }, size) => {
  const robots = copy(data);
  const newState: Array<Robot | null> = [];
  for (let i = 0; i < robots.length; i++) {
    newState.push(null);
  }

  const iteration: number = 100;

  const tasks = [];
  for (let i = 0; i < robots.length; i++) {
    const robot = robots[i];
    tasks.push(setNextStateAsync(robot, size, iteration)
      .then(state => newState[i] = state)
    );
  }
  await Promise.all(tasks);

  const finalState = newState.map(robot => robot!);
  const safetyFactor = calculateSafetyFactor(finalState, size);
  return safetyFactor;
};

type SetAsyncFn = (robot: Robot, mapSize: Size, iteration?: number) => Promise<Robot>;

const setNextStateAsync: SetAsyncFn = (robot, mapSize, iteration = 1) => {
  const promise = new Promise<Robot>((resolve) => {
    setTimeout(() => {
      setNextState(robot, mapSize, iteration);
      resolve(robot);
    });
  });

  return promise;
};

type SetFn = (robot: Robot, mapSize: Size, iteration?: number) => void;

const setNextState: SetFn = (robot, mapSize, iteration = 1) => {
  for (let i = 0; i < iteration; i++) {
    move(robot, mapSize);
  }
};

type MoveFn = (robot: Robot, mapSize: Size) => void;

const move: MoveFn = (robot, mapSize) => {
  robot.position.x += robot.velocity.x;
  robot.position.y += robot.velocity.y;

  if (robot.position.x < 0) {
    const diff = Math.abs(robot.position.x);
    robot.position.x = mapSize.width - diff;
  }

  if (robot.position.x >= mapSize.width) {
    robot.position.x = robot.position.x - mapSize.width;
  }

  if (robot.position.y < 0) {
    const diff = Math.abs(robot.position.y);
    robot.position.y = mapSize.height - diff;
  }

  if (robot.position.y >= mapSize.height) {
    robot.position.y = robot.position.y - mapSize.height;
  }
};

type CalculateFn = (robots: Array<Robot>, mapSize: Size) => number;

const calculateSafetyFactor: CalculateFn = (robots, mapSize) => {
  const quad1 = getQuadrant(robots, mapSize, 1);
  const quad2 = getQuadrant(robots, mapSize, 2);
  const quad3 = getQuadrant(robots, mapSize, 3);
  const quad4 = getQuadrant(robots, mapSize, 4);

  return quad1.length * quad2.length * quad3.length * quad4.length;
}

type getFn = (robots: Array<Robot>, mapSize: Size, quadrant: 1|2|3|4) => Array<Robot>;

const getQuadrant: getFn = (robots, mapSize, quadrant) => {
  const quad = [];

  const midx = Math.floor(mapSize.width / 2);
  const midy = Math.floor(mapSize.height / 2);

  for (const robot of robots) {
    if (quadrant === 1 && robot.position.x < midx && robot.position.y < midy) {
      quad.push(robot);
    } else if (quadrant === 2 && robot.position.x > midx && robot.position.y < midy) {
      quad.push(robot);
    } else if (quadrant === 3 && robot.position.x < midx && robot.position.y > midy) {
      quad.push(robot);
    } else if (quadrant === 4 && robot.position.x > midx && robot.position.y > midy) {
      quad.push(robot);
    }
  }

  return quad;
};

export { solution, setNextState };