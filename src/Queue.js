class Queue {
  constructor(lengthLimit) {
    this.lengthLimit = lengthLimit;
    this.storage = [];
  }

  enqueue(item) {
    if (this.getCurrentLength() === this.getLengthLimit()) {
      this.dequeue();
    }
    this.storage.push(item);
    return this;
  }

  dequeue() {
    return this.storage.shift();
  }

  getLengthLimit() {
    return this.lengthLimit;
  }

  getCurrentLength() {
    return this.storage.length;
  }

  getQueue() {
    return this.storage;
  }
}

export default Queue;
