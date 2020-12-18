const t = require('tap');
const RedBlackTree = require('../RedBlackTree');

t.test('RedBlackTree', (t) => {
  t.test('Construct', (t) => {
    const tree = new RedBlackTree();

    t.ok(tree, 'Tree is not exist');

    t.end();
  });

  t.test('Zero size', (t) => {
    const tree = new RedBlackTree();

    t.same(tree.size, 0, 'Size of tree should be 0 when the tree is empty');

    t.end();
  });

  t.test("Method 'put'", (t) => {
    t.test('More than 0 size', (t) => {
      const tree = new RedBlackTree();
      tree.put('Key 1', 1);
      tree.put('Key 2', 2);

      t.same(
        tree.size,
        2,
        "Size of tree should be more than zero when the tree isn't empty"
      );

      t.end();
    });

    t.test('Put with null key', (t) => {
      const tree = new RedBlackTree();
      tree.put(null, 1);

      t.same(
        tree.size,
        0,
        'Size of tree should be 0 when someone wants to put with null key'
      );

      t.end();
    });

    t.test('Put in root', (t) => {
      const tree = new RedBlackTree();
      const result = tree.put('Key', 100);

      t.same(
        result,
        null,
        "Method 'put': should return null when the tree had no mapping for key"
      );

      t.end();
    });

    t.end();
  });

  t.test("Method 'isEmpty'", (t) => {
    t.test('Tree is empty', (t) => {
      const tree = new RedBlackTree();

      t.same(
        tree.isEmpty(),
        true,
        "Method 'isEmpty' should return true when the tree is empty"
      );

      t.end();
    });

    t.test("Tree isn't empty", (t) => {
      const tree = new RedBlackTree();
      tree.put('Key', 1);

      t.same(
        tree.isEmpty(),
        false,
        "Method 'isEmpty' should return flase when the tree isn't empty"
      );

      t.end();
    });

    t.end();
  });

  t.test("Method 'ContainsKey'", (t) => {
    t.test('Key is awful', (t) => {
      const tree = new RedBlackTree();
      const result = tree.containsKey('Something awful');

      t.same(
        result,
        false,
        "Method 'containsKey': should return false when the tree doesn't contain such "
      );

      t.end();
    });

    t.test('Key is nice', (t) => {
      const tree = new RedBlackTree();
      tree.put('Key', 1);
      const result = tree.containsKey('Key');

      t.same(
        result,
        true,
        "Method 'containsKey': should return true when the tree contains such "
      );

      t.end();
    });

    t.end();
  });

  t.test("Method 'ContainsValue'", (t) => {
    t.test('Value is awful', (t) => {
      const tree = new RedBlackTree();
      const result = tree.containsValue(100);

      t.same(
        result,
        false,
        "Method 'containsValue': should return false when the tree doesn't contain such "
      );

      t.end();
    });

    t.test('Value is nice', (t) => {
      const tree = new RedBlackTree();
      tree.put('Key', 100);
      const result = tree.containsValue(100);

      t.same(
        result,
        true,
        "Method 'containsValue': should return true when the tree contains such "
      );

      t.end();
    });

    t.end();
  });

  t.test("Method 'equals'", (t) => {
    t.test('Trees are equal', (t) => {
      const tree1 = new RedBlackTree();
      tree1.put('Key 1', 1);
      tree1.put('Key 2', 2);
      tree1.put('Key 3', 3);

      const tree2 = new RedBlackTree();
      tree2.put('Key 1', 1);
      tree2.put('Key 2', 2);
      tree2.put('Key 3', 3);

      const result = tree1.equals(tree2);

      t.same(
        result,
        true,
        "Method 'equals': should return true when trees are equal"
      );

      t.end();
    });

    t.test("Trees aren't equal", (t) => {
      const tree1 = new RedBlackTree();
      tree1.put('Key 1', 1);
      tree1.put('Key 2', 2);
      tree1.put('Key 3', 3);

      const tree2 = new RedBlackTree();
      tree2.put('Key 1', -1);
      tree2.put('Key 2', -2);
      tree2.put('Key 3', -3);

      const result = tree1.equals(tree2);

      t.same(
        result,
        false,
        "Method 'equals': should return false when trees are not equal"
      );

      t.end();
    });

    t.end();
  });

  t.test("Method 'clear'", (t) => {
    const tree = new RedBlackTree();
    tree.put('Key 1', 1);
    tree.put('Key 2', 2);
    tree.put('Key 3', 3);

    tree.clear();

    const emptyTree = new RedBlackTree();

    const result = tree.equals(emptyTree);

    t.same(
      result,
      true,
      "Method 'clear': should clear the data when the tree contains data"
    );

    t.end();
  });

  t.test("Method 'remove'", (t) => {
    t.test('Remove non-existent key', (t) => {
      const tree = new RedBlackTree();
      tree.put('Key', 100);

      const result = tree.remove('Key 1');

      t.same(
        result,
        null,
        "Method 'remove': should return null when the tree had no mapping for key"
      );

      t.end();
    });

    t.test("'Remove and check with method 'equals'", (t) => {
      const tree1 = new RedBlackTree();
      tree1.put('Key 3', 300);

      const tree2 = new RedBlackTree();
      tree2.put('Key 3', 300);
      tree2.put('Key 4', 400);
      tree2.put('Key 5', 500);

      tree2.remove('Key 4');
      tree2.remove('Key 5');

      const result = tree1.equals(tree2);

      t.same(
        result,
        true,
        "Method 'remove': should delete entry when tree isn't empty"
      );

      t.end();
    });

    t.end();
  });

  t.end();
});
