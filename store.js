class Mem {

  constructor() {
    this.cache = {}
    this.takenBy = null;
  }

  add(username, item) {
    if (!this.cache[username]) {
      this.cache[username] = [];
    }

    if (this.cache[username].indexOf(item) === -1) {
      this.cache[username].push(item);
    }
  }

  remove(username, item) {
    if (this.cache[username]) {
      let newArray = this.cache[username];
      newArray.splice(newArray.indexOf(item), 1);
      this.cache[username] = newArray;
    }
  }
}

module.exports = new Mem();
