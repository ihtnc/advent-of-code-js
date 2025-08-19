import { SymbolType, type Coordinates, type InputData, type Options } from "./types";
import { addWalls, convert, getOptimalPath, removeDeadEnds } from "./solution-part1";
import { copyMap } from "./utilities";

type Fn = ({ coordinates }: InputData, options: Options) => Promise<string>;

const solution: Fn = async ({ coordinates }, { map, batchSize }) => {
  const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
      let index = findGreatestSolveableIndex(map, coordinates, 0, batchSize);
      if (index === null || index < 0) {
        resolve('N/A');
        return;
      }

      index = findGreatestSolveableIndex(map, coordinates, index, 1);
      if (index === null || index < 0) {
        resolve('N/A');
        return;
      }

      // if the last index is solveable, then there is no nonsolveable index
      if (index >= coordinates.length - 1) {
        resolve('N/A');
        return;
      }

      const firstNonSolveableIndex = index + 1;
      const result = coordinates[firstNonSolveableIndex];
      resolve(`${result.x},${result.y}`);
    });
  });

  return promise;
};

type FindIndexFn = (map: Array<Array<SymbolType>>, coordinates: Array<Coordinates>, startIndex: number, increment: number) => number | null;

const findGreatestSolveableIndex: FindIndexFn = (map, coordinates, startIndex, increment) => {
  const symbols = copyMap(map);
  if (startIndex < 0 || startIndex >= coordinates.length) { return null; }

  const source = [...coordinates];
  const existingWalls = source.splice(0, startIndex);
  // check part 1 for addWalls definition
  addWalls(symbols, existingWalls);

  let index: number | null = existingWalls.length > 0 ? startIndex : null;
  while (source.length > 0) {
    const walls = source.splice(0, increment);
    // check part 1 for addWalls definition
    addWalls(symbols, walls);
    const start = findCoordinate(symbols, SymbolType.START);
    const end = findCoordinate(symbols, SymbolType.END);
    if (start === null || end === null) { break; }

    // check part 1 for convert and removeDeadEnds definition
    const data = convert(symbols);
    removeDeadEnds(data);

    const startLocation = data[start.y][start.x];
    const endLocation = data[end.y][end.x];
    // check part 1 for getOptimalPath definition
    const path = getOptimalPath(startLocation, endLocation);
    if (path.length === 0) { break; }

    index = (index ?? 0) + walls.length;
  }

  return index !== null ? index - 1 : null;
};

type FindCoordinateFn = (map: Array<Array<SymbolType>>, symbol: SymbolType) => Coordinates | null;

const findCoordinate: FindCoordinateFn = (map, symbol) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === symbol) {
        return { x, y };
      }
    }
  }
  return null;
};

export { solution };