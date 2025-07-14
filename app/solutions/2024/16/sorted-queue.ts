export default class SortedQueue<T> {
  private queue: Array<T>;
  private sortFn: (a: T, b: T) => number;

  constructor(sortFn: (a: T, b: T) => number) {
    this.queue = [];
    this.sortFn = sortFn;
  }

  enqueue(item: T) {
    this.queue.push(item);
    this.queue.sort(this.sortFn);
  }

  dequeue(): T | undefined {
    return this.queue.shift();
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
};