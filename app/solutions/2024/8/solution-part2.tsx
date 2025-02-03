import type { Coordinates, InputData } from './input-parser';
import { type SearchPairsFn, getAntiNodes, removeDuplicates, searchAntenna } from './solution-part1';

type Fn = ({ map, antennae }: InputData) => Promise<number>;

const solution: Fn = async ({ map, antennae }) => {
  const nodes: Array<Coordinates> = [];

  const tasks = [];
  for (const id in antennae) {
    const points = antennae[id];

    // check part 1 for searchAntenna definition
    tasks.push(searchAntenna(map, points, searchPairs)
      .then((found) => {
        nodes.push(...found);
        nodes.push(...points);
      })
    );
  }
  await Promise.all(tasks);

  // check part 1 for removeDuplicates definition
  const unique = removeDuplicates(nodes);
  return unique.length;
};

const searchPairs: SearchPairsFn = (map, coordinates, coordinate) => {
  const promise = new Promise<Array<Coordinates>>((resolve) => {
    setTimeout(() => {
      const nodes: Array<Coordinates> = [];

      for (const point of coordinates) {
        if (point.y < coordinate.y) { continue; }
        if (point.y == coordinate.y && point.x <= coordinate.x) { continue; }

        // check part 1 for getAntiNodes definition
        const nodes1 = getAntiNodes(map, coordinate, point, true);
        nodes.push(...nodes1);

        const nodes2 = getAntiNodes(map, point, coordinate, true);
        nodes.push(...nodes2);
      }

      resolve(nodes);
    });
  });

  return promise;
};

export { solution };