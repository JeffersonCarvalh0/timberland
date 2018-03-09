import { BinarySearchTree } from "../BinarySearchTree";
import { assert } from 'chai';
import 'mocha';

describe('Testing BinarySearchTree class', function(){
  let tree = new BinarySearchTree();

  describe('constructor', function () {
    it('Should return a valid BinarySearchTree object', function() {
      assert.instanceOf(tree, BinarySearchTree);
    });

    it("It's root should be undefined", function() {
      assert.typeOf(tree.root, 'undefined');
    });

    it("Its initial size should be zero", function() {
      assert.equal(tree.size, 0);
    });
  });

  describe('insert', function() {
    it('Should insert the first element as the root', function () {
      tree.insert(42);
      assert.equal(tree.root.data, 42);
    });

    it('Should insert number 7 in the tree', function () {
      tree.insert(7);
      assert.equal(tree.find(7), true, '7 was not found after insertion');
    });

    it('Should insert -2 in the tree', function () {
      tree.insert(-2);
      assert.equal(tree.find(-2), true, '-2 was not found after insertion');
    });

    it("It should not insert a non integer vaule, since it's a number tree", function() {
      tree.insert('ahahahah');
      assert.equal(tree.find('ahahahah'), false, 'The string was found in the tree.');
    });
  });
});
