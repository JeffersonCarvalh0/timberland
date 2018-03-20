import { RBTree } from "../src/RBTree";
import { assert } from "chai";
import "mocha";

describe('Testing RBTree class', function() {
  let tree = new RBTree();

  describe('constructor', function() {
    it('Should return a valid RBTree object', function() {
      assert.instanceOf(tree, RBTree);
    });

    it('Its initial size should be 0', function() {
      assert.equal(tree.getSize(), 0);
    });
  });
});
