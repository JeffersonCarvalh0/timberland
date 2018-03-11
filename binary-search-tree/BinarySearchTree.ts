interface NodeData<T> {
  /* Interface that is needed to be implemented by user made objects so that the
  tree can work. */
  equals?(obj: T): boolean;
  greaterThan?(obj: T): boolean;
}

class TreeNode<T> {
  /* A node used in the tree. */
  data: T & NodeData<T>;
  left: TreeNode<T> | undefined;
  right: TreeNode<T> | undefined;

  constructor(data: T) {
    this.data = data;
    this.left = undefined;
    this.right = undefined;
  }

  equals(obj: TreeNode<T>): boolean {
    /* Checks whether an equals function exists in the object. If it doesnt,
    tries to use === operator to perform equality check instead. */

    if (this.data.equals)
      return <boolean>this.data.equals(obj.data);
    else
      return this.data === obj.data;
  }

  greaterThan(obj: TreeNode<T>): boolean {
    /* Checks whether an greaterThan function exists in the object. If it doesnt,
    tries to use > operator to check if this.data is greater than obj.data */

    if (this.data.greaterThan)
      return <boolean>this.data.greaterThan(obj.data);
    else
      return this.data > obj.data;
  }
}

export class BinarySearchTree<T> {
  /* The main class */
  private root: TreeNode<T> | undefined;
  private size: number;

  constructor() {
    this.root = undefined;
    this.size = 0;
  }

  getSize(): number {
    return this.size;
  }

  clear() {
    this.root = undefined;
    this.size = 0;
  }

  count(n: T): number {
    let times = 0;
    let value: T & NodeData<T>;

    for (let value of this.valuesGen()) {
      if (value.greaterThan) {
        if(value.greaterThan(n))
          break;
      } else {
        if (value > n)
          break;
      }

      if (value.equals) {
        if(value.equals(n))
          ++times;
      } else {
        if (value === n)
          ++times;
      }
    }
    return times;
  }

  *valuesGen() {
    /* Yields an element stored in the tree in crescent order at each iteration.
    It's done by implementing Morris Inorder Tree Traversal Algorithm. */

    let curNode = this.root;

    while (curNode) {
      if (!curNode.left) {
        yield curNode.data;
        curNode = curNode.right;
      } else {
        let pre = curNode.left;
        while (pre.right && pre.right !== curNode)
          pre = pre.right;
        if (pre.right == curNode) {
          yield curNode.data;
          pre.right = undefined;
          curNode = curNode.right;
        } else {
          pre.right = curNode;
          curNode = curNode.left;
        }
      }
    }
  }

  valuesList(): T[] {
    let values = [];

    for (let value of this.valuesGen())
      values.push(value);
    return values;
  }

  insert(value: T) {
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

  find(value: T): boolean {
    let found = this.findRef(value)[0];
    return found ? true : false;
  }

  remove(value: T): boolean {
    let curNode: TreeNode<T> | undefined;
    let parent: TreeNode<T> | undefined;
    [curNode, parent] = this.findRef(value);

    if (!curNode && !parent)
      return false;

    if (curNode) {
      if (!curNode.right && !curNode.left) { // The node to be removed has no children
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
          candidateParent.right = candidate.left;

        candidate.left = curNode.left;
        candidate.right = curNode.right;

        if (parent)
          curNode.greaterThan(parent) ? parent.right = candidate : parent.left = candidate;
        else
          this.root = candidate;
      }
      return true;
    }
    return false;
  }
}
