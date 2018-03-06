class TreeNode<T> {
  data: T;
  left: TreeNode<T> | undefined;
  right: TreeNode<T> | undefined;

  constructor(data: T) {
    this.data = data;
    this.left = undefined;
    this.right = undefined;
  }
}

export class BinarySearchTree<T> {
  root: TreeNode<T> | undefined;
  size: number;

  constructor() {
    this.root = undefined;
    this.size = 0;
  }

  insert(value: T) {
    if (this.root == undefined) {
      this.root = new TreeNode(value);
    } else {
      let currentNode = this.root;
      while (true) {
        if (value > currentNode.data) {
          if (currentNode.right)
            currentNode = currentNode.right;
          else {
            currentNode.right = new TreeNode(value);
            break;
          }
        } else {
          if (currentNode.left)
            currentNode = currentNode.left;
          else {
            currentNode.left = new TreeNode(value);
            break;
          }
        }
      }
    }
    ++this.size;
  }

  find (value: T): boolean {
    let curNode = this.root;
    while (curNode) {
      if (value === curNode.data)
        return true;
      else {
        if (value < curNode.data)
          curNode = curNode.left;
        else
          curNode = curNode.right;
      }
    }
    return false;
  }
}
