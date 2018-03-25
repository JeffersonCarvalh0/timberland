import { RBTree } from "../src/RBTree";
import { assert } from "chai";
import "mocha";

describe('Testing RBTree class', function() {
  let tree = new RBTree(true);
  let nonRepTree = new RBTree();

  describe('constructor', function() {
    it('Should return a valid RBTree object', function() {
      assert.instanceOf(tree, RBTree, "Instance of 'tree' is not valid.");
      assert.instanceOf(nonRepTree, RBTree, "Instance of 'nonRepTree' is not valid.");
    });

    it('Its initial size should be 0', function() {
      assert.equal(tree.getSize(), 0, "The size of 'tree' is wrong.");
      assert.equal(nonRepTree.getSize(), 0, "The size of 'nonRepTree' is wrong.");
    });
  });

  describe('insert', function() {
    it('Should insert number 2 in the tree', function() {
      assert.equal(tree.insert(2), true, "Could not insert 2 in the 'tree'.");
      assert.equal(tree.find(2), true, "2 Could not be found in the 'tree' after insertion.");
      assert.equal(nonRepTree.insert(2), true, "Could not insert 2 in the 'nonRepTree'.");
      assert.equal(nonRepTree.find(2), true, "2 Could not be found in the 'nonRepTree' after insertion.");
    });

    it('Should insert number 3 in the tree', function() {
      assert.equal(tree.insert(3), true, "Could not insert 3 in the 'tree'.");
      assert.equal(tree.find(3), true, "3 could not be found in the 'tree' after insertion.");
      assert.equal(nonRepTree.insert(3), true, "Could not insert 3 in the 'nonRepTree'.");
      assert.equal(nonRepTree.find(3), true, "3 could not be found in the 'nonRepTree' after insertion.");
    });

    it('Should insert number 1 in the tree', function() {
      assert.equal(tree.insert(1), true, "Could not insert 1 in the 'tree'.");
      assert.equal(tree.find(1), true, "1 could not be found in the 'tree' after insertion.");
      assert.equal(nonRepTree.insert(1), true, "Could not insert 1 in the 'nonRepTree'.");
      assert.equal(nonRepTree.find(1), true, "1 could not be found in the 'nonRepTree' after insertion.");
    });

    it('Should insert repeated elements when repeated is set to true', function() {
      assert.equal(tree.insert(2), true, "Insert returned false");
    });

    it('Should not insert repeated elements when repeated is set to false', function() {
      assert.equal(nonRepTree.insert(2), false, "insert returned true.");
    });
  });

  describe('count', function() {
    it('Should count the number of a specific element in the tree correctly', function() {
      assert.equal(tree.count(2), 2, "The number of elements is incorrect");
      assert.equal(nonRepTree.count(2), 1, "The number of elements is incorrect.");
    });
  });

  // describe('remove', function() {
  //   it('Should correctly remove an element from the tree', function() {
  //     assert.equal(tree.remove(2), true, "Remove from the 'tree' returned false.");
  //     assert.equal(tree.count(2), 1, "The element count from the 'tree' is incorrect.");
  //
  //     assert.equal(nonRepTree.remove(2), true, "Remove from the 'nonRepTree' returned false.");
  //     assert.equal(nonRepTree.count(2), 0, "The element count from the 'nonRepTree' is incorrect.");
  //   });
  // });

  describe('getSize', function() {
    it('Should correctly count the number of elements in the tree', function() {
      assert.equal(tree.getSize(), 3, "The 'tree' size is wrong.");
      assert.equal(nonRepTree.getSize(), 2, "The 'nonRepTree' size is wrong.");
    });
  });
});
