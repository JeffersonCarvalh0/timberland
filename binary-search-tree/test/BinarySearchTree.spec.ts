import { BinarySearchTree } from "../BinarySearchTree";
import { assert } from 'chai';
import 'mocha';

describe('Testing BinarySearchTree class', function(){
  let tree = new BinarySearchTree();

  describe('constructor', function () {
    it('Should return a valid BinarySearchTree object', function() {
      assert.instanceOf(tree, BinarySearchTree);
    });

    it('Should return 0 as the initial size', function() {
      assert.equal(tree.getSize(), 0, "The initial size isn't zero");
    });
  });

  describe('insert', function() {
    it('Should insert the first element as the root', function () {
      tree.insert(42);
      assert.equal(tree.find(42), true);
    });

    it('Should insert number 7 in the tree', function () {
      tree.insert(7);
      assert.equal(tree.find(7), true, '7 was not found after insertion');
    });

    it('Should insert -2 in the tree', function () {
      tree.insert(-2);
      assert.equal(tree.find(-2), true, '-2 was not found after insertion');
    });
  });

  describe('find', function() {
    it('Should find 7 in the tree', function() {
      assert.equal(tree.find(7), true, '7 was not found in the tree.');
    });

    it('Should find -2 in the tree', function() {
      assert.equal(tree.find(-2), true, '-2 was not found in the tree.');
    });

    it('Should not find 3 in the tree', function() {
      assert.equal(tree.find(3), false, '3 was found in the tree(???)');
    });
  });

  describe('valuesList', function() {
    it('Should display the values in the tree in an increasing order', function() {
      tree.insert(2);
      tree.insert(59);
      tree.insert(-3);
      let expectedValues = [-3, -2, 2, 7, 42, 59];
      let treeValues = tree.valuesList();
      for (let i = 0; i < expectedValues.length; ++i)
        assert.equal(expectedValues[i], treeValues[i], `expected ${expectedValues[i]}, got ${treeValues[i]}`);
    });

    it('Should still keep the order after inserting repeated values', function() {
      tree.insert(-3);
      tree.insert(7);
      tree.insert(7);
      let expectedValues = [-3, -3, -2, 2, 7, 7, 7, 42, 59];
      let treeValues = tree.valuesList();
      for (let i = 0; i < expectedValues.length; ++i)
        assert.equal(expectedValues[i], treeValues[i], `expected ${expectedValues[i]}, got ${treeValues[i]}`);
    });
  });

  describe('valuesGen', function() {
    it('Should generate the correct values using next', function() {
      let expectedValues = [-3, -3, -2, 2, 7, 7, 7, 42, 59];
      let gen = tree.valuesGen();
      for (let i = 0; i < 9; ++i) {
        let generated = gen.next().value;
        assert.equal(generated, expectedValues[i], `expected ${expectedValues[i]}, got ${generated}`);
      }
    });
  });

  describe('number getter', function() {
    it('Should return the right number of nodes', function() {
      assert.equal(tree.getSize(), 9, `expected 9, got ${tree.getSize()}`);
    });
  });

  describe('count', function() {
    it('Should count how many elements of that value are in the tree', function() {
      let n = tree.count(7);
      assert.equal(n, 3, `expected to find 7 3 times, found ${n} times`);
      n = tree.count(-3);
      assert.equal(n, 2, `expected to find -3 2 times, found ${n} times`);
      n = tree.count(33);
      assert.equal(n, 0, `expected to find 33 0 times, found ${n} times`);
    });
  });

  describe('remove', function() {
    it('Should remove an element with the specified value', function() {
      let n = tree.getSize();
      tree.remove(-3);
      assert.equal(tree.count(-3), 1, 'The element was not removed.');
      assert.equal(tree.getSize(), n - 1, "The tree's size is wrong.");
    });

    it('Should remove an element that is not repeated', function() {
      tree.remove(59);
      assert.equal(tree.find(59), false, 'The element still is in the tree.');
    });

    it('Should return false if the element to be removed is not in the tree', function() {
      let ret = tree.remove(123456);
      assert.equal(ret, false);
    });
  });

  describe('clear', function() {
    describe('The tree must be clear after the function call', function() {
      it('Its size must be zero', function() {
        tree.clear();
        assert.equal(tree.getSize(), 0, `The size is ${tree.getSize()}`);
      });

      it('valuesList() should return an empty list', function() {
        let treeValues = tree.valuesList();
        assert.isEmpty(treeValues, `inorderValues still have ${treeValues.length} elements.`);
      });
    });
  });
});
