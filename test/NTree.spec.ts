import { NTree } from "../src/NTree";
import { assert } from "chai";
import "mocha";

describe('Testing NTree class', function() {
  let tree = new NTree();

  describe('constructor', function() {
    it('Should return a valid NTree object', function() {
      assert.instanceOf(tree, NTree);
      assert.equal(tree.getSize(), 0);
    });
  });

  describe('insert', function() {
    it('Should insert an element in the tree', function() {
      tree.insert(parent, value);
      assert.equal(tree.getSize(), 1);
    });
  });
});
