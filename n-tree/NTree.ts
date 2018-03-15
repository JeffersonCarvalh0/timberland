/**
  This module contains a class to represent a N-ary tree.
*/

import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";

/**
  A node used in the tree.
  @hidden
*/
class TreeNode<T> {
  data: T & NodeData<T>;
  child: TreeNode<T> | undefined;
  siblings: BinarySearchTree<TreeNode<T>> | undefined;

  constructor(data: T) {
    this.data = data;
    this.child = undefined;
    this.nextSibling = undefined;
  }

  // equals(obj: T) {
  //
  // }
}

/**
    The N-ary tree class. Like the others, it is a generic class, so any object
  implementing the [[NodeData]] interface correctly should work here.
    In this tree, sibling nodes should not have repeated values.
*/
export class NTree<T> {
  root: TreeNode<T> | undefined;
  size: number;

  constructor() {
    this.root = undefined;
    this.size = 0;
  }

  /**
    @returns The amount of elements stored int the tree.
  */
  getSize() {
    return this.size;
  }


}
