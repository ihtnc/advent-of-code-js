import { copy, setNextState } from './solution-part1';
import type { InputData, Robot, Size } from './types';

type Fn = ({ robots }: InputData, mapSize: Size) => Promise<number>;

const solution: Fn = async ({ robots: data }, mapSize) => {
  const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      // check part 1 for copy definition
      const robots = copy(data);
      let iteration: number = 0;

      // may need to be adjusted
      const maxIterations = 100000;

      while (true) {
        const newState: Array<Robot> = [];
        for (const robot of robots) {
          // check part 1 for setNextState definition
          setNextState(robot, mapSize);
          newState.push(robot);
        }

        iteration++;
        if (iteration > maxIterations) { break; }

        const map = plotRobots(newState, mapSize);
        if (checkPattern(map)) { return resolve(iteration); }
      }

      return reject();
    });
  });

  return promise;
};

type PlotFn = (robots: Array<Robot>, mapSize: Size) => Array<Array<string>>;

const plotRobots: PlotFn = (robots, mapSize) => {
  const map: Array<Array<string>> = [];

  for (let y = 0; y < mapSize.height; y++) {
    map[y] = [];
    for (let x = 0; x < mapSize.width; x++) {
      map[y][x] = '.';
    }
  }

  for (const robot of robots) {
    map[robot.position.y][robot.position.x] = 'X';
  }

  return map;
};

type CheckFn = (map: Array<Array<string>>) => boolean;

const checkPattern: CheckFn = (map)=> {
  // the Christmas tree pattern was found by manually inspecting the logs
  //   when using the print function (see the print function below)
  // initially, blindly logging the state of the map every iteration
  //   revealed a somewhat emerging pattern on iteration 9 and 65
  // the "pattern" on iteration 9 repeats every 101 iterations
  //   while the "pattern" on iteration 65 repeats every 103 iterations
  // logging the state of the map on these iterations helped reduce the noise
  //   which eventually led to a state where the Christmas tree pattern appeared
  // the pattern was then coded into this solution to be used

  let topBorderY = -1;
  let topBorderX = -1;
  for (let i = 0; i < map.length - pattern.length; i++) {
    const row = map[i];
    const line = row.join('');
    topBorderX = line.indexOf(pattern[0]);
    if (topBorderX !== -1) {
      topBorderY = i;
      break;
    }
  }

  if (topBorderX === -1) { return false; }

  for (let y = 0; y < pattern.length; y++) {
    const row = map[topBorderY + y];
    const line = row.slice(topBorderX, topBorderX + pattern[y].length).join('');
    if (line !== pattern[y]) {
      return false;
    }
  }

  return true;
};

const pattern = [
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "X.............................X",
  "X.............................X",
  "X.............................X",
  "X.............................X",
  "X..............X..............X",
  "X.............XXX.............X",
  "X............XXXXX............X",
  "X...........XXXXXXX...........X",
  "X..........XXXXXXXXX..........X",
  "X............XXXXX............X",
  "X...........XXXXXXX...........X",
  "X..........XXXXXXXXX..........X",
  "X.........XXXXXXXXXXX.........X",
  "X........XXXXXXXXXXXXX........X",
  "X..........XXXXXXXXX..........X",
  "X.........XXXXXXXXXXX.........X",
  "X........XXXXXXXXXXXXX........X",
  "X.......XXXXXXXXXXXXXXX.......X",
  "X......XXXXXXXXXXXXXXXXX......X",
  "X........XXXXXXXXXXXXX........X",
  "X.......XXXXXXXXXXXXXXX.......X",
  "X......XXXXXXXXXXXXXXXXX......X",
  "X.....XXXXXXXXXXXXXXXXXXX.....X",
  "X....XXXXXXXXXXXXXXXXXXXXX....X",
  "X.............XXX.............X",
  "X.............XXX.............X",
  "X.............XXX.............X",
  "X.............................X",
  "X.............................X",
  "X.............................X",
  "X.............................X",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
];

type PrintFn = (iteration: number, robots: Array<Robot>, mapSize: Size) => void;

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const print: PrintFn = (iteration, robots, mapSize) => {
  const map = plotRobots(robots, mapSize);

  console.log('==============================');
  console.log(`Iteration: ${iteration}`);
  for (let y = 0; y < mapSize.height; y++) {
    let line = '';
    for (let x = 0; x < mapSize.width; x++) {
      line += map[y] && map[y][x] ? map[y][x] : '.';
    }

    console.log(line);
  }
  console.log(`Iteration: ${iteration}`);
  console.log('==============================');
};

export { solution };