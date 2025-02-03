import type { Coordinates, InputData, Map } from './input-parser';

type Fn = ({ map, antennae }: InputData) => Promise<number>;

const solution: Fn = async ({ map, antennae }) => {
  const nodes: Array<Coordinates> = [];

  const tasks = [];
  for (const id in antennae) {
    const points = antennae[id];

    tasks.push(searchAntenna(map, points, searchPairs)
      .then((found) => { nodes.push(...found); })
    );
  }
  await Promise.all(tasks);

  const unique = removeDuplicates(nodes);
  return unique.length;
};

type SearchAntennaFn = (map: Map, coordinates: Array<Coordinates>, searchPairs: SearchPairsFn) => Promise<Array<Coordinates>>;

const searchAntenna: SearchAntennaFn = async (map, coordinates, searchPairs) => {
  const nodes: Array<Coordinates> = [];

  const tasks = [];
  for (let i = 0; i < coordinates.length; i++) {
    const point = coordinates[i];
    const newCoordinates = coordinates.slice(i + 1);
    tasks.push(searchPairs(map, newCoordinates, point)
      .then((found) => { nodes.push(...found); })
    );
  }
  await Promise.all(tasks);

  return nodes;
};

export type SearchPairsFn = (map: Map, coordinates: Array<Coordinates>, coordinate: Coordinates) => Promise<Array<Coordinates>>;

const searchPairs: SearchPairsFn = (map, coordinates, coordinate) => {
  const promise = new Promise<Array<Coordinates>>((resolve) => {
    setTimeout(() => {
      const nodes: Array<Coordinates> = [];

      for (const point of coordinates) {
        const nodes1 = getAntiNodes(map, coordinate, point, false);
        nodes.push(...nodes1);

        const nodes2 = getAntiNodes(map, point, coordinate, false);
        nodes.push(...nodes2);
      }

      resolve(nodes);
    });
  });

  return promise;
};

type GetFn = (map: Map, source: Coordinates, pair: Coordinates, getAll: boolean) => Array<Coordinates>;

const getAntiNodes: GetFn = (map: Map, source, pair, getAll) => {
  const nodes: Array<Coordinates> = [];

  const offset: Coordinates = {
    x: source.x - pair.x,
    y: source.y - pair.y,
  };

  let antiNode: Coordinates = {
    x: source.x + offset.x,
    y: source.y + offset.y,
  };

  while (isWithinBounds(map, antiNode)) {
    nodes.push(antiNode);

    if (!getAll) { break; }

    antiNode = {
      x: antiNode.x + offset.x,
      y: antiNode.y + offset.y,
    };
  }

  return nodes;
}

type CheckFn = (map: Map, coordinate: Coordinates) => boolean;

const isWithinBounds: CheckFn = (map, coordinate) => {
  return coordinate.x >= 0 && coordinate.x < map.cols
      && coordinate.y >= 0 && coordinate.y < map.rows;
};

type RemoveFn = (nodes: Array<Coordinates>) => Array<Coordinates>;

const removeDuplicates: RemoveFn = (nodes) => {
  const keys = new Set<string>();
  const unique: Array<Coordinates> = [];

  for (const node of nodes) {
    const key = `${node.x},${node.y}`;
    if (keys.has(key)) { continue; }

    keys.add(key);
    unique.push(node);
  }

  return unique;
};

export { solution, searchAntenna, getAntiNodes, removeDuplicates };