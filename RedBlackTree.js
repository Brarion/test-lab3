const { pull } = require('lodash');
const lodash = require('lodash');

class Entry {
  constructor(key, value, parent) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
    this.parent = parent;

    this.color = 'BLACK';
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  clear() {
    this.root = null;
    this.size = 0;
  }

  findLeaf(key) {
    let currentEntryParrent = null;
    let currentEntry = this.root;

    while (currentEntry !== null) {
      currentEntryParrent = currentEntry;
      currentEntry = key === this.key ? currentEntry.left : currentEntry.right;
    }

    return currentEntryParrent;
  }

  isEmpty() {
    return this.size === 0;
  }

  setColor(entry, color) {
    if (color !== null) entry.color = color;
  }

  parentOf(entry) {
    return entry == null ? null : entry.parent;
  }

  grandparentOf(entry) {
    return entry === null || entry.parent === null ? null : entry.parent.parent;
  }

  isRed(entry) {
    return entry !== null && entry.color === 'RED';
  }

  isBlack(entry) {
    return entry !== null && entry.color === 'BLACK';
  }

  siblingOf(entry) {
    return entry === null || entry.parent === null
      ? null
      : entry == entry.parent.left
      ? entry.parent.right
      : entry.parent.left;
  }

  leftOf(entry) {
    return entry === null ? null : entry.left;
  }

  rightOf(entry) {
    return entry === null ? null : entry.right;
  }

  rotateLeft(entry) {
    const rightOfEntry = this.rightOf(entry);
    entry.right = this.leftOf(rightOfEntry);
    if (this.leftOf(rightOfEntry) !== null) {
      rightOfEntry.left.parent = entry;
    }
    rightOfEntry.parent = entry.parent;
    if (this.parentOf(entry) === null) {
      this.root = rightOfEntry;
    } else if (this.leftOf(this.parentOf(entry)) == entry) {
      entry.parent.left = rightOfEntry;
    } else {
      entry.parent.right = rightOfEntry;
    }
    rightOfEntry.left = entry;
    entry.parent = rightOfEntry;
  }

  rotateRight(entry) {
    const leftOfEntry = this.leftOf(entry);
    entry.left = this.rightOf(leftOfEntry);
    if (this.rightOf(leftOfEntry) !== null) {
      leftOfEntry.right.parent = entry;
    }
    leftOfEntry.parent = this.parentOf(entry);
    if (this.parentOf(entry) === null) {
      this.root = leftOfEntry;
    } else if (this.rightOf(this.parentOf(entry)) == entry) {
      entry.parent.right = leftOfEntry;
    } else entry.parent.left = leftOfEntry;
    leftOfEntry.right = entry;
    entry.parent = leftOfEntry;
  }

  fixAfterInsertion(entry) {
    this.setColor(entry, 'RED');

    if (
      entry !== null &&
      entry !== this.root &&
      this.isRed(this.parentOf(entry))
    ) {
      if (this.isRed(this.siblingOf(this.parentOf(entry)))) {
        this.setColor(this.parentOf(entry), 'BLACK');
        this.setColor(this.siblingOf(this.parentOf(entry)), 'BLACK');
        this.setColor(this.grandparentOf(entry), 'RED');
        this.fixAfterInsertion(this.grandparentOf(entry));
      } else if (
        this.parentOf(entry) == this.leftOf(this.grandparentOf(entry))
      ) {
        if (entry == this.rightOf(this.parentOf(entry))) {
          this.rotateLeft((entry = this.parentOf(entry)));
        }
        this.setColor(this.parentOf(entry), 'BLACK');
        this.setColor(this.grandparentOf(entry), 'RED');
        this.rotateRight(this.grandparentOf(entry));
      } else if (
        this.parentOf(entry) == this.rightOf(this.grandparentOf(entry))
      ) {
        if (entry == this.leftOf(this.parentOf(entry))) {
          this.rotateRight((entry = this.parentOf(entry)));
        }
        this.setColor(this.parentOf(entry), 'BLACK');
        this.setColor(this.grandparentOf(entry), 'RED');
        this.rotateLeft(this.grandparentOf(entry));
      }
    }

    this.setColor(this.root, 'BLACK');
  }

  fixAfterRemoval(entry) {
    while (lodash.isEqual(entry, this.root) && this.isBlack(entry)) {
      if (lodash.isEqual(entry, this.leftOf(this.parentOf(entry)))) {
        let sibling = this.rightOf(this.parentOf(entry));
        if (this.isRed(sibling)) {
          this.setColor(sibling, 'BLACK');
          this.setColor(this.parentOf(entry), 'RED');
          this.rotateLeft(this.parentOf(entry));
          sibling = this.rightOf(this.parentOf(entry));
        }
        if (
          this.isBlack(this.leftOf(sibling)) &&
          this.isBlack(this.rightOf(sibling))
        ) {
          this.setColor(sibling, 'RED');
          entry = this.parentOf(entry);
        } else {
          if (this.isBlack(this.rightOf(sibling))) {
            this.setColor(this.leftOf(sibling), 'BLACK');
            this.setColor(sibling, 'RED');
            this.rotateRight(sibling);
            sibling = this.rightOf(this.parentOf(entry));
          }
          this.setColor(sibling, this.colorOf(this.parentOf(entry)));
          this.setColor(this.parentOf(entry), 'BLACK');
          this.setColor(this.rightOf(sibling), 'BLACK');
          this.rotateLeft(this.parentOf(entry));
          entry = this.root;
        }
      } else {
        let sibling = this.leftOf(this.parentOf(entry));
        if (this.isRed(sibling)) {
          this.setColor(sibling, 'BLACK');
          this.setColor(this.parentOf(entry), 'RED');
          this.rotateRight(this.parentOf(entry));
          sibling = this.leftOf(this.parentOf(entry));
        }
        if (
          this.isBlack(this.leftOf(sibling)) &&
          this.isBlack(this.rightOf(sibling))
        ) {
          this.setColor(sibling, 'RED');
          entry = this.parentOf(entry);
        } else {
          if (this.isBlack(this.leftOf(sibling))) {
            this.setColor(this.rightOf(sibling), 'BLACK');
            this.setColor(sibling, 'RED');
            this.rotateLeft(sibling);
            sibling = this.leftOf(this.parentOf(entry));
          }
          this.setColor(sibling, this.colorOf(this.parentOf(entry)));
          this.setColor(this.parentOf(entry), 'BLACK');
          this.setColor(this.leftOf(sibling), 'BLACK');
          this.rotateRight(this.parentOf(entry));
          entry = this.root;
        }
      }
    }
    this.setColor(entry, 'BLACK');
  }

  put(key, value) {
    if (key !== null) {
      if (this.root === null) {
        this.root = new Entry(key, value, null);
        this.size = 1;
      } else {
        const leaf = this.findLeaf(key);
        if (leaf !== null) {
          const newEntry = new Entry(key, value, leaf);

          if (key < leaf.key) {
            leaf.left = newEntry;
          } else if (key > leaf.key) {
            leaf.right = newEntry;
          } else {
            leaf.value = value;
          }

          this.size++;
          this.fixAfterInsertion(newEntry);
        }
      }

      return null;
    }
  }

  remove(key) {
    const entry = this.getEntry(key);
    if (entry === null) return null;
    this.removeEntry(entry);
  }

  removeEntry(entry) {
    this.size--;

    if (this.leftOf(entry) !== null && this.rightOf(entry) !== null) {
      const successor = this.successor(entry);
      entry.key = successor.key;
      entry.value = successor.value;
      entry = successor;
    }

    const pullUp =
      this.leftOf(entry) === null ? this.rightOf(entry) : this.leftOf(entry);

    if (pullUp !== null) {
      if (lodash.isEqual(entry, this.root)) {
        this.root = pullUp;
        this.root.parent = null;
      } else if (this.leftOf(this.parentOf(entry)) == entry) {
        entry.parent.left = pullUp;
      } else {
        entry.parent.right = pullUp;
      }
      if (this.isBlack(entry)) {
        this.fixAfterRemoval(pullUp);
      }
    } else if (entry == this.root) {
      this.root = null;
    } else {
      if (this.isBlack(entry)) {
        this.fixAfterRemoval(entry);
      }
      if (entry.parent !== null) {
        if (entry == entry.parent.left) {
          entry.parent.left = null;
        } else if (entry == entry.parent.right) {
          entry.parent.right = null;
        }
        entry.parent = null;
      }
    }
  }

  getEntry(key) {
    if (key !== null) {
      let currentEntry = this.root;
      while (currentEntry !== null) {
        if (key < currentEntry.key) {
          currentEntry = currentEntry.left;
        } else if (key > currentEntry.key) {
          currentEntry = currentEntry.right;
        } else {
          return currentEntry;
        }
      }

      return null;
    }
  }

  getFirstEntry() {
    let currentEntry = this.root;
    if (currentEntry !== null) {
      while (this.leftOf(currentEntry) !== null) {
        currentEntry = this.leftOf(currentEntry);
      }
    }
    return currentEntry;
  }

  successor(entry) {
    if (entry === null) return null;
    else if (entry.right !== null) {
      let currentEntry = entry.right;
      while (currentEntry.left !== null) currentEntry = currentEntry.left;
      return currentEntry;
    } else {
      let currentEntry = entry.parent;
      let previousEntry = entry;
      while (currentEntry !== null && previousEntry == currentEntry.right) {
        previousEntry = currentEntry;
        currentEntry = currentEntry.parent;
      }
      return currentEntry;
    }
  }

  containsKey(key) {
    return this.getEntry(key) !== null;
  }

  containsValue(value) {
    for (
      let entry = this.getFirstEntry();
      entry !== null;
      entry = this.successor(entry)
    )
      if (value === entry.value) return true;

    return false;
  }

  equals(tree) {
    return lodash.isEqual(tree, this);
  }
}

module.exports = RedBlackTree;
