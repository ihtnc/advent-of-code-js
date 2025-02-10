import { type Plot, type InputData } from './types';

type Fn = ({ map }: InputData) => Promise<number>;

const solution: Fn = async ({ map: input }) => {
  let total = 0;
  const map = convert(input);
  groupPlots(map);

  const visited = new Set<Plot>();
  const tasks = [];
  for (const line of map) {
    for (const plot of line) {
      if (visited.has(plot)) { continue; }

      const group = getGroup(plot);
      setVisited(group, visited);
      tasks.push(calculatePrice(group)
        .then((result) => { total += result; })
      );
    }
  }

  await Promise.all(tasks);

  return total;
};

type ConvertFn = (map: Array<Array<string>>) => Array<Array<Plot>>;

const convert: ConvertFn = (map) =>  {
  const newMap: Array<Array<Plot>> = [];
  let previousLine: Array<Plot> = [];

  for (const line of map) {
    const newLine: Array<Plot> = [];
    for (let i = 0; i < line.length; i++) {
      const plant = line[i];

      let top: Plot | undefined;
      if (previousLine.length === line.length) {
        top = previousLine[i];
      }

      let left: Plot | undefined;
      if (i > 0) {
        left = newLine[i - 1];
      }

      const trail: Plot = {
        plant,
        top,
        left,
      };

      if (top) { top.bottom = trail; }
      if (left) { left.right = trail; }

      newLine.push(trail);
    }

    if (newLine.length === 0) { continue; }

    newMap.push(newLine);
    previousLine = newLine;
  }

  return newMap;
};

type GroupFn = (map: Array<Array<Plot>>) => void;

const groupPlots: GroupFn = (map) => {
  for (const line of map) {
    for (const plot of line) {
      const plant = plot.plant;

      if (plot.right && plot.right.plant !== plant) {
        plot.right.left = undefined;
        plot.right = undefined;
      }

      if (plot.left && plot.left.plant !== plant) {
        plot.left.right = undefined;
        plot.left = undefined;
      }

      if (plot.bottom && plot.bottom?.plant !== plant) {
        plot.bottom.top = undefined;
        plot.bottom = undefined;
      }

      if (plot.top && plot.top.plant !== plant) {
        plot.top.bottom = undefined;
        plot.top = undefined;
      }
    }
  }
};

type GetFn = (plot: Plot) => Array<Plot>;

const getGroup: GetFn = (plot) => {
  const group: Array<Plot> = [];

  const visited = new Set<Plot>();
  const queue: Array<Plot> = [plot];
  while(queue.length > 0) {
    const current = queue.shift();
    if (!current) { continue; }
    if (visited.has(current)) { continue; }
    if (current.right) { queue.push(current.right); }
    if (current.left) { queue.push(current.left); }
    if (current.top) { queue.push(current.top); }
    if (current.bottom) { queue.push(current.bottom); }
    group.push(current);
    visited.add(current);
  }

  return group;
};

type SetFn = (group: Array<Plot>, visited: Set<Plot>) => void;

const setVisited: SetFn = (group, visited) => {
  for (const plot of group) {
    if (visited.has(plot)) { continue; }
    visited.add(plot);
  }
};

type CalculateFn = (group: Array<Plot>, uniqueSidesOnly?: boolean) => Promise<number>;

const calculatePrice: CalculateFn = (group, uniqueSidesOnly = false) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      let area = 0;
      let perimeter = 0;

      for (const plot of group) {
        if (plot.top === undefined
          && (!uniqueSidesOnly || plot.left === undefined || plot.left.top !== undefined)) {
          perimeter++;
        }

        if (plot.bottom === undefined
          && (!uniqueSidesOnly || plot.left === undefined || plot.left.bottom !== undefined)) {
          perimeter++;
        }

        if (plot.left === undefined
          && (!uniqueSidesOnly || plot.top === undefined || plot.top.left !== undefined)) {
          perimeter++;
        }

        if (plot.right === undefined
          && (!uniqueSidesOnly || plot.top === undefined || plot.top.right !== undefined)) {
          perimeter++;
        }

        area++;
      }

      resolve(area * perimeter);
    });
  });

  return promise;
};

export { solution, convert, groupPlots, getGroup, setVisited, calculatePrice };