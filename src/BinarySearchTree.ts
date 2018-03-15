/**
    This module contains a class to represent a Binary Search Tree.
  It supports both repeated and non repeated elements: you can set this
  constraint when creating a new tree object.
    An important thing to know is that the types you want to use in the tree
  must implement the [[NodeData]] interface. Otherwise, the tree won't
  work accordingly.
  @preferred
*/

import { NodeData } from "./NodeData";

/**
  A node used in the tree.
  @hidden
*/
class TreeNode<T> {
  data: T & NodeData<T>;
  amount: number;
  left: TreeNode<T> | undefined;
  right: TreeNode<T> | undefined;

  constructor(data: T) {
    this.data = data;
    this.amount = 1;
    this.left = undefined;
    this.right = undefined;
  }

  /** Checks whether an equals function exists in the object. If it doesnt,
  tries to use === operator to perform equality check instead. */
  equals(obj: TreeNode<T>): boolean {
    if (this.data.equals)
      return <boolean>this.data.equals(obj.data);
    else
      return this.data === obj.data;
  }

  /** Checks whether an greaterThan function exists in the object. If it doesnt,
  tries to use > operator to check if this.data is greater than obj.data */
  greaterThan(obj: TreeNode<T>): boolean {
    if (this.data.greaterThan)
      return <boolean>this.data.greaterThan(obj.data);
    else
      return this.data > obj.data;
  }
}

/** The Binary Search Tree class. It is a generic class, so it is supposed to
support user defined types. However, in order to the class work properly, it
is necessary that the given type implements the [[NodeData]] interface. */
export class BinarySearchTree<T> {
  private root: TreeNode<T> | undefined;
  private size: number;
  private repeated: boolean;

  /**
    @param {boolean} repeated true if you want the tree to allow repeated elements. By default it is false.
  */
  constructor(repeated = false) {
    this.root = undefined;
    this.size = 0;
    this.repeated = repeated;
  }

  /**
    @returns The amount of elements stored in the tree.
  */
  getSize(): number {
    return this.size;
  }

  /**
    Clear the tree. It will loose reference to every node that had been stored.
  */
  clear() {
    this.root = undefined;
    this.size = 0;
  }

  /**
    @param {T} value The value that you want to count in the tree.
    @returns The number of elements that match that value.
  */
  count(value: T): number {
    let element = this.findRef(value)[0];

    if (element)
      return element.amount;
    else
      return  0;
  }

  /**
    A generator that yields the elements of the tree in order.
  */
  valuesGen() {
    function *helper(curNode: TreeNode<T> | undefined): any {
      if (curNode) {
        yield *helper(curNode.left);
        for (let i = 0; i < curNode.amount; ++i)
          yield curNode.data;
        yield *helper(curNode.right);
      }
    }
    return helper(this.root);
  }

  /**
    @returns an array of elements stored in the tree in increasing order. It's
    done by implementing Morris Inorder Tree Traversal Algorithm.
  */
  valuesList(): T[] {
    let values = [];
    let curNode = this.root;

    while (curNode) {
      if (!curNode.left) {
        for (let i = 0; i < curNode.amount; ++i)
          values.push(curNode.data);
        curNode = curNode.right;
      } else {
        let pre = curNode.left;
        while (pre.right && pre.right !== curNode)
          pre = pre.right;
        if (pre.right == curNode) {
          for (let i = 0; i < curNode.amount; ++i)
            values.push(curNode.data);
          pre.right = undefined;
          curNode = curNode.right;
        } else {
          pre.right = curNode;
          curNode = curNode.left;
        }
      }
    }
    return values;
  }

  /**
    @param {T} value The value to be stored in the tree.
    @returns true if the element was successfully stored, false otherwise.
  */
  insert(value: T): boolean {
    let newNode = new TreeNode<T>(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (true) {
        if (newNode.greaterThan(currentNode)) {
          if (currentNode.right)
            currentNode = currentNode.right;
          else {
            currentNode.right = newNode;
            break;
          }
        } else if (newNode.equals(currentNode) && this.repeated) {
          ++currentNode.amount;
          break;
        } else if(newNode.equals(currentNode) && !this.repeated)  {
          return false;
        } else {
          if (currentNode.left)
            currentNode = currentNode.left;
          else {
            currentNode.left = newNode;
            break;
          }
        }
      }
    }
    ++this.size;
    return true;
  }

  private findRef(value: T) {
    let seekedValue = new TreeNode(value);
    let curNode = this.root;
    let curParent: TreeNode<T> | undefined;
    curParent = undefined;

    while (curNode) {
      if (seekedValue.equals(curNode))
        return [curNode, curParent];
      else {
        curParent = curNode;
        if (seekedValue.greaterThan(curNode))
          curNode = curNode.right;
        else
          curNode = curNode.left;
      }
    }
    return [undefined, undefined];
  }

  /**
    @param {T} value The value to be searched.
    @returns true if the falue was found, false otherwise.
  */
  find(value: T): boolean {
    let found = this.findRef(value)[0];
    return found ? true : false;
  }

  /**
    @param {T} value The value to be removed.
    @returns true if the value was found and removed, false otherwise.
  */
  remove(value: T): boolean {
    let curNode: TreeNode<T> | undefined;
    let parent: TreeNode<T> | undefined;
    [curNode, parent] = this.findRef(value);

    if (!curNode && !parent)
      return false;

    if (curNode) {
      if (curNode.amount > 1)
        --curNode.amount;
      else if (!curNode.right && !curNode.left) { // The node to be removed has no children
        if (parent) {
          if (curNode.greaterThan)
            curNode.greaterThan(parent) ? parent.right = undefined : parent.left = undefined;
        } else
          this.root = undefined;
      } else if (!curNode.left || !curNode.right) { // The node to be removed has only one child
        let child = curNode.left || curNode.right;
        if (parent) {
          if (curNode.greaterThan)
            curNode.greaterThan(parent) ? parent.right = child : parent.left = child;
        } else
          this.root = child;
      } else { // The node to be removed has two children
        let candidateParent = curNode;
        let candidate = curNode.left;

        while(candidate.right) { // Find the rightmost node of the left subtree
          candidateParent = candidate;
          candidate = candidate.right;
        }

        if (candidate.left) // If the candidate has a left child
            candidateParent.left = candidate.left;

        if (curNode.left.equals) {
          if (!curNode.left.equals(candidate))
            candidate.left = curNode.left;
        }
        candidate.right = curNode.right;

        if (parent)
          curNode.greaterThan(parent) ? parent.right = candidate : parent.left = candidate;
        else
          this.root = candidate;
      }
      --this.size;
      return true;
    }
    return false;
  }
}