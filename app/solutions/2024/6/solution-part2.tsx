import { Marker, type InputData, type Move } from './types';
import { PathType, type Path, getNextMove, traverse } from './solution-part1';

type Fn = ({ map, guard }: InputData) => Promise<number>;

const solution: Fn = async ({ map, guard }) => {
  // check part 1 for traverse definition
  const { start } = await traverse(map, guard);
  let loopCount = 0;

  const previousObstacles: Array<Move> = [];

  const tasks = [];
  let currentPath: Path | undefined = start;
  while (currentPath?.next) {
    if (!currentPath.next.move) { break; }

    const current = currentPath.next.move;
    currentPath = currentPath.next;

    // check part 1 for getNextMove definition
    const next = getNextMove(map, current);
    if (!next) { continue; }

    // if next move is a rotation, it means a box was already ahead
    //   so just skip this move
    if (next.x === current.x && next.y === current.y) { continue; }

    // if next move is on the guard location
    //   just skip this move
    if (next.x === guard.x && next.y === guard.y) { continue; }

    // if next move has been an obstacle already
    //   just skip this move as this situation shouldn't happen
    const hasTried = previousObstacles
      .some(o => o.x === next.x && o.y === next.y)
    if (hasTried) { continue; }

    // add a new obstacle to the map
    const newMap = copyMap(map);
    newMap[next.y][next.x] = Marker.Obstacle;
    previousObstacles.push(next);

    tasks.push(
      traverse(newMap, current)
        .then(({ type }) => {
          if (type === PathType.Looping) {
            loopCount++;
          }
        })
    );
  }

  await Promise.all(tasks);
  return loopCount;
};

type CopyFn = (map: Array<Array<Marker>>) => Array<Array<Marker>>;

const copyMap: CopyFn = (map) => {
  const newMap: Array<Array<Marker>> = [];
  for (const row of map) {
    newMap.push([...row]);
  }

  return newMap;
}

export { solution };