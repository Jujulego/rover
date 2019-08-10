// Type
type Element<T> = { value: T, priority: number }

// Class
class PriorityQueue<T> {
  // Attributes
  private readonly _queue = new Array<Element<T>>();

  // Properties
  get isEmpty(): boolean {
    return this._queue.length === 0;
  }

  // Methods
  enqueue(value: T, priority: number) {
    this._queue.unshift({ value, priority });

    // Sort !
    const inserted = this._queue[0];
    for (let i = 1; i < this._queue.length; ++i) {
      const tmp = this._queue[i];

      if (tmp.priority > inserted.priority) {
        this._queue[i-1] = tmp;
      } else {
        this._queue[i-1] = inserted;
        break;
      }
    }
  }

  dequeue(): T | undefined {
    const last = this._queue.pop();
    return last && last.value;
  }
}

export default PriorityQueue;