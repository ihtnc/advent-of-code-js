import type { InputData, Number, Direction, ButtonFace, IButtonConnection } from './types';

type Fn = ({ codes }: InputData) => Promise<number>;
type InferTypeMapOfButtonFace<C extends Map<Number | Direction, ButtonFace<Number | Direction>>> = C extends Map<infer T, ButtonFace<infer T>> ? T : unknown;
type InferTypeArrayOfButtonConnection<C extends Array<IButtonConnection<Number | Direction>>> = C extends Array<infer T> ? T : unknown;

const solution: Fn = async ({ codes }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const pathMap = createPathMap();
      const numPad = createNumericKeyPad();
      const dirPad = createDirectionalKeyPad();

      let totalComplexity = 0;
      for (const numCode of codes) {
        // get the shortest instructions for traversing each character in the code (for robot 1)
        const r1Instructions = getInstruction(pathMap, numPad, numCode);
        if (r1Instructions === null || r1Instructions.length === 0) { continue; }

        // get the shortest instructions for the previous instructions (for robot 2)
        const r2Instructions = getInstruction(pathMap, dirPad, r1Instructions);
        if (r2Instructions === null || r2Instructions.length === 0) { continue; }

        // get the shortest instructions for the previous instructions (for robot 3)
        const r3Instructions = getInstruction(pathMap, dirPad, r2Instructions);
        if (r3Instructions === null || r3Instructions.length === 0) { continue; }

        const complexity = parseInt(numCode) * r3Instructions.length;
        totalComplexity += complexity;
      }

      return resolve(totalComplexity);
    });
  });

  return promise;
};

type GetInstructionFn = <T extends Number | Direction>(pathMap: Map<Number | Direction, Map<Number | Direction, string>>, keyPad: Map<T, ButtonFace<T>>, code: string) => string | null;

const getInstruction: GetInstructionFn = (pathMap, keyPad, code) => {
  // split the code into segments, retaining the 'A' character
  const segments = code.split(/(.*?A)/).filter((s) => s.length > 0);
  for (const segment of segments) {
    // find shortest paths for traversing each character in the code
    // cache each segment for future use
    findAndCachePath(pathMap, keyPad, segment);
  }

  // construct the instruction from the cached segments
  const instructions = buildInstruction(pathMap, code);
  return instructions;
};

type CachePathFn = <T extends Number | Direction>(pathMap: Map<Number | Direction, Map<Number | Direction, string>>, keyPad: Map<T, ButtonFace<T>>, code: string) => void;

const findAndCachePath: CachePathFn = (pathMap, keyPad, code) => {
  const keys = code.split('').map((char) => char as InferTypeMapOfButtonFace<typeof keyPad>);
  let start = 'A' as InferTypeMapOfButtonFace<typeof keyPad>;
  for (const key of keys) {
    if (pathMap.has(start) && pathMap.get(start)!.has(key)) {
      start = key;
      continue;
    }

    const path = getShortestPath(keyPad, start, key);
    if (path === null) {
      start = key;
      continue;
    }

    if (!pathMap.has(start)) {
      pathMap.set(start, new Map<InferTypeMapOfButtonFace<typeof keyPad>, string>());
    }

    pathMap.get(start)!.set(key, path);
    start = key;
  }
};

type BuildInstructionFn = (pathMap: Map<Number | Direction, Map<Number | Direction, string>>, code: string) => string | null;

const buildInstruction: BuildInstructionFn = (pathMap, code) => {
  const keys = code.split('').map((char) => char as Number | Direction);

  const instructions: Array<string> = [];
  let start: Number | Direction = 'A';
  for (const key of keys) {
    if (!pathMap.has(start) || !pathMap.get(start)!.has(key)) {
      return null;
    }

    const path = pathMap.get(start)!.get(key)!;
    instructions.push(path);
    instructions.push('A');
    start = key;
  }

  return instructions.join('');
};

type GetPathFn = <T extends Number | Direction>(keyPad: Map<T, ButtonFace<T>>, start: T, end: T) => string | null;

const getShortestPath: GetPathFn = (keyPad, start, end) => {
  if (!keyPad.has(start) || !keyPad.has(end)) { return null; }
  if (start === end) { return ''; }

  const visited = new Map<InferTypeMapOfButtonFace<typeof keyPad>, number>();
  const queue: Array<[InferTypeMapOfButtonFace<typeof keyPad>, string]> = [[start, '']];

  while (queue.length > 0) {
    const [current, currentPath] = queue.shift()!;
    if (current === end) { return currentPath; }

    const distance = currentPath.length;
    if (!visited.has(current)) { visited.set(current, distance); }

    const currentButton = keyPad.get(current)!;
    const prevDirection = currentPath.slice(-1);

    // remove neighbours that have already been visited and have been visited from lower depth iterations
    const validNeighbours = currentButton.neighbours.filter(
      (n) => !visited.has(n.button.value) || visited.get(n.button.value)! >= distance
    );

    // prioritise neighbours that go to the same direction
    if (prevDirection.length === 1) {
      const sameDirectionIndex = validNeighbours.findIndex((n) => n.direction === prevDirection);
      if (sameDirectionIndex >= 0) {
        const sameDirection = validNeighbours.splice(sameDirectionIndex, 1)[0];
        queue.push([sameDirection.button.value, `${currentPath}${sameDirection.direction}`]);
      }
    }

    const priorities = prioritiseNeighbours(validNeighbours);
    for (const priority of priorities) {
      queue.push([priority.button.value, `${currentPath}${priority.direction}`]);
    }
  }

  return null;
};

type PrioritiseFn = <T extends Number | Direction>(validNeighbours: Array<IButtonConnection<T>>) => Array<IButtonConnection<T>>;

const prioritiseNeighbours: PrioritiseFn = (validNeighbours) => {
  // prioritise neighbours that results in a shorter path for the directional keypad
  const queue: Array<InferTypeArrayOfButtonConnection<typeof validNeighbours>> = [];

  const leftIndex = validNeighbours.findIndex((n) => n.direction === '<');
  if (leftIndex >= 0) {
    const left = validNeighbours.splice(leftIndex, 1)[0];
    queue.push(left);
  }

  const downIndex = validNeighbours.findIndex((n) => n.direction === 'v');
  if (downIndex >= 0) {
    const down = validNeighbours.splice(downIndex, 1)[0];
    queue.push(down);
  }

  const upIndex = validNeighbours.findIndex((n) => n.direction === '^');
  if (upIndex >= 0) {
    const up = validNeighbours.splice(upIndex, 1)[0];
    queue.push(up);
  }

  // enqueue any remaining neighbours
  for (const neighbour of validNeighbours) {
    queue.push(neighbour);
  }

  return queue;
};

type CreatePathMapFn = () => Map<Number | Direction, Map<Number | Direction, string>>;

const createPathMap: CreatePathMapFn = () => {
  const map = new Map<Number | Direction, Map<Number | Direction, string>>();

  // because of the space on the lower left corner of the numeric keypad,
  //   and the space on the upper left corner of the directional keypad,
  //   some optimisation rules could result in a longer path for these combinations
  // so, hardcode the most optimal path instead

  map.set('A', new Map<Number | Direction, string>());
  map.get('A')!.set('1', '^<<');   // the rules will result to <^<
  map.get('A')!.set('4', '^^<<');  // the rules will result to <^^<
  map.get('A')!.set('7', '^^^<<'); // the rules will result to <^^^<
  map.get('A')!.set('<', 'v<<');   // the rules will result to <v<

  map.set('7', new Map<Number | Direction, string>());
  map.get('7')!.set('0', '>vvv');  // the rules will result to vv>v
  map.get('7')!.set('A', '>>vvv'); // the rules will result to vv>>v

  map.set('4', new Map<Number | Direction, string>());
  map.get('4')!.set('0', '>vv');  // the rules will result to v>v
  map.get('4')!.set('A', '>>vv'); // the rules will result to v>>v

  return map;
};

type CreateKeyPadFn<T extends Number | Direction> = () => Map<T, ButtonFace<T>>;

const createNumericKeyPad: CreateKeyPadFn<Number> = () => {
  const button1: ButtonFace<Number> = { value: '1', neighbours: [] };
  const button2: ButtonFace<Number> = { value: '2', neighbours: [] };
  const button3: ButtonFace<Number> = { value: '3', neighbours: [] };
  const button4: ButtonFace<Number> = { value: '4', neighbours: [] };
  const button5: ButtonFace<Number> = { value: '5', neighbours: [] };
  const button6: ButtonFace<Number> = { value: '6', neighbours: [] };
  const button7: ButtonFace<Number> = { value: '7', neighbours: [] };
  const button8: ButtonFace<Number> = { value: '8', neighbours: [] };
  const button9: ButtonFace<Number> = { value: '9', neighbours: [] };
  const button0: ButtonFace<Number> = { value: '0', neighbours: [] };
  const buttonA: ButtonFace<Number> = { value: 'A', neighbours: [] };

  button7.neighbours.push({ direction: '>', button: button8 });
  button7.neighbours.push({ direction: 'v', button: button4 });

  button8.neighbours.push({ direction: '>', button: button9 });
  button8.neighbours.push({ direction: 'v', button: button5 });
  button8.neighbours.push({ direction: '<', button: button7 });

  button9.neighbours.push({ direction: '<', button: button8 });
  button9.neighbours.push({ direction: 'v', button: button6 });

  button4.neighbours.push({ direction: '^', button: button7 });
  button4.neighbours.push({ direction: '>', button: button5 });
  button4.neighbours.push({ direction: 'v', button: button1 });

  button5.neighbours.push({ direction: '^', button: button8 });
  button5.neighbours.push({ direction: '>', button: button6 });
  button5.neighbours.push({ direction: 'v', button: button2 });
  button5.neighbours.push({ direction: '<', button: button4 });

  button6.neighbours.push({ direction: '^', button: button9 });
  button6.neighbours.push({ direction: 'v', button: button3 });
  button6.neighbours.push({ direction: '<', button: button5 });

  button1.neighbours.push({ direction: '^', button: button4 });
  button1.neighbours.push({ direction: '>', button: button2 });

  button2.neighbours.push({ direction: '^', button: button5 });
  button2.neighbours.push({ direction: '>', button: button3 });
  button2.neighbours.push({ direction: 'v', button: button0 });
  button2.neighbours.push({ direction: '<', button: button1 });

  button3.neighbours.push({ direction: '^', button: button6 });
  button3.neighbours.push({ direction: 'v', button: buttonA });
  button3.neighbours.push({ direction: '<', button: button2 });

  button0.neighbours.push({ direction: '^', button: button2 });
  button0.neighbours.push({ direction: '>', button: buttonA });

  buttonA.neighbours.push({ direction: '^', button: button3 });
  buttonA.neighbours.push({ direction: '<', button: button0 });

  const keyPad = new Map<Number, ButtonFace<Number>>();
  keyPad.set('1', button1);
  keyPad.set('2', button2);
  keyPad.set('3', button3);
  keyPad.set('4', button4);
  keyPad.set('5', button5);
  keyPad.set('6', button6);
  keyPad.set('7', button7);
  keyPad.set('8', button8);
  keyPad.set('9', button9);
  keyPad.set('0', button0);
  keyPad.set('A', buttonA);
  return keyPad;
};

const createDirectionalKeyPad: CreateKeyPadFn<Direction> = () => {
  const buttonL: ButtonFace<Direction> = { value: '<', neighbours: [] };
  const buttonR: ButtonFace<Direction> = { value: '>', neighbours: [] };
  const buttonU: ButtonFace<Direction> = { value: '^', neighbours: [] };
  const buttonD: ButtonFace<Direction> = { value: 'v', neighbours: [] };
  const buttonA: ButtonFace<Direction> = { value: 'A', neighbours: [] };

  buttonU.neighbours.push({ direction: '>', button: buttonA });
  buttonU.neighbours.push({ direction: 'v', button: buttonD });

  buttonL.neighbours.push({ direction: '>', button: buttonD });

  buttonD.neighbours.push({ direction: '^', button: buttonU });
  buttonD.neighbours.push({ direction: '>', button: buttonR });
  buttonD.neighbours.push({ direction: '<', button: buttonL });

  buttonR.neighbours.push({ direction: '^', button: buttonA });
  buttonR.neighbours.push({ direction: '<', button: buttonD });

  buttonA.neighbours.push({ direction: 'v', button: buttonR });
  buttonA.neighbours.push({ direction: '<', button: buttonU });

  const keyPad = new Map<Direction, ButtonFace<Direction>>();
  keyPad.set('^', buttonU);
  keyPad.set('v', buttonD);
  keyPad.set('<', buttonL);
  keyPad.set('>', buttonR);
  keyPad.set('A', buttonA);
  return keyPad;
};

export { solution, createPathMap, createNumericKeyPad, createDirectionalKeyPad, getInstruction, findAndCachePath };