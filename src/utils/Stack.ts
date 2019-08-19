// Class
class Stack<T> {
  // Attributes
  private readonly _stack = new Array<T>();

  // Properties
  get isEmpty(): boolean {
    return this._stack.length === 0;
  }

  get next(): T | undefined {
    return this._stack[this._stack.length-1];
  }

  // Methods
  put(value: T) {
    this._stack.push(value);
  }

  get(): T | undefined {
    return this._stack.pop();
  }
}

export default Stack;