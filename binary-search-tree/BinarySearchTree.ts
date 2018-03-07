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
  root: TreeNode<T> | undefined;
  size: number;

  constructor() {
    this.root = undefined;
    this.size = 0;
  }

  // inorderValues (): T[] {
  //   /* Returns a list with the values stored in the tree in crescent order.
  //   It's done by implementing Morris Inorder Tree Traversal Algorithm. */
  //
  //   values: T[] = []
  //
  //   let curNode = this.root;
  //   while (curNode) {
  //     if (!curNode.left) {
  //       values.push(curNode.data);
  //       curNode = curNode.right;
  //     } else {
  //       let pre = curNode.left;
  //       while (pre.right && pre !== curNode)
  //     }
  //   }
  // }

  insert(value: T) {
    let newNode = new TreeNode(value);
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

  find(value: T): boolean {
    let seekedValue = new TreeNode(value);
    let curNode = this.root;
    while (curNode) {
      if (seekedValue.equals(curNode))
        return true;
      else {
        if (seekedValue.greaterThan(curNode))
          curNode = curNode.right;
        else
          curNode = curNode.left;
      }
    }
    return false;
  }
}
