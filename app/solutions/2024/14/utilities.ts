import { type Robot } from "./types";

type CopyFn = (robots: Array<Robot>) => Array<Robot>;

export const copy: CopyFn = (robots) => {
  const copy = [];
  for (const robot of robots) {
    const { velocity, position } = robot;
    copy.push({
      velocity: { ...velocity },
      position: { ...position },
    });
  }

  return copy;
};
