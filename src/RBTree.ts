import { NodeData } from "./NodeData";

/** Defines the colors used in the Red Black Tree */
const enum Colors {
  Red, Black
}

/** A class that represents a node in the [[RBTree]].  */
export class RBNode<T> {
  /** The data to be stored in the node. */
  data: T & NodeData<T>;

  /** The number of copies of that data that are stored in the node. This
  should not be > 1 if you don't want repeated elements. */
  amount: number;

  /** The color of the node. I can be either 'Red' or 'Black' according to
  the Enum [[Colors]] */
  color: Colors;

  /** A reference to the left node. Its data shoud be lesser than the data
  of the current node. */
  left: RBNode<T> | undefined;

  /** A reference to the right node. Its data should be greater than the data
  of the current node. */
  right: RBNode<T> | undefined;

  /** A reference to the parent node. */
  parent: RBNode<T> | undefined;

  /**
    @param {T} data The data to be stored in the node.
    @param {Colors} color The color of the node.
    @param {RBNode<T> | undefined} parent A reference to the parent node.
  */
  constructor(data: T & NodeData<T>, color: Colors, parent: (RBNode<T> | undefined) = undefined) {
    this.data = data;
    this.color = color;
    this.parent = parent;
    this.amount = 1;
    this.left = undefined;
    this.right = undefined;
  }

  /**
    Checks whether an equals function exists in the object. If it doesnt,
    tries to use === operator to perform equality check instead.

    @param {RBNode<T>} obj The node containing the value you want to compare.
    @returns true if they are equal, false otherwise.
  */
  equals(obj: RBNode<T>): boolean {
    if (this.data.equals)
      return <boolean>this.data.equals(obj.data);
    else
      return this.data === obj.data;
  }

  /**
    Checks whether an greaterThan function exists in the object. If it doesnt,
    tries to use > operator to check if this.data is greater than obj.data.

    @param {RBNode<T>} obj The node containing the value you want to compare.
    @returns true if this value > obj's data, false otherwise.
  */
  greaterThan(obj: RBNode<T>): boolean {
    if (this.data.greaterThan)
      return <boolean>this.data.greaterThan(obj.data);
    else
      return this.data > obj.data;
  }
}

/** A class that represents a Red Black Tree. It is a self-balancing Binary
Search Tree, and a good choice if you need to store ordered elements in a way
that they can be inserted, removed and found in an efficient way.
  Notice that the elements to be stored in this structure need to implement the
[[NodeData]] interface, otherwise the tree's internal functions won't work. */
export class RBTree<T> {
  private root: RBNode<T> | undefined;
  private size: number;
  private repeated: boolean;

  /**
    @param {boolean} repeated  Set it to true if you want the structure to allow
    repeated elements, false otherwise
  */
  constructor(repeated = false) {
    this.root = undefined;
    this.size = 0;
    this.repeated = repeated;
  }

  /**
    This function will return the root of the Red Black Tree.
    Use it if you want to perform custom operations in the tree.

    @returns a [[RBNode]] if the a root node exists, undefined if the tree is
    empty.
  */
  getRoot(): RBNode<T> | undefined {
    return this.root;
  }

  /**
    @returns the number of elements stored in the tree.
  */
  getSize(): number {
    return this.size;
  }

  /**
    @param {T | RBNode<T>} obj The value or node to be stored.
    @returns true if obj was successfully stored, false otherwise
  */
  insert(obj: T | RBNode<T>): boolean {
    let newNode = (obj instanceof RBNode) ? obj : new RBNode<T>(obj, Colors.Red); // The color is red

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
            newNode.parent = currentNode; // Now we have to add the parent
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
            newNode.parent = currentNode; // Now we have to add the parent
            break;
          }
        }
      }
    }
    ++this.size;
    this.fixUp(newNode);
    return true;
  }

  /** Function used for rotations when necessary to balance the tree */
  private leftRotate(parent: RBNode<T>) {
    let child = parent.right;

    if (child) {
      parent.right = child.left;
      if (child.left)
        child.left.parent = parent;
      child.parent = parent.parent;
      if (!parent.parent)
        this.root = child;
      else if (parent == parent.parent.left)
        parent.parent.left = child;
      else if (parent == parent.parent.right)
        parent.parent.right = child;
    }
  }

  /** Function used for rotations when necessary to balance the tree */
  private rightRotate(parent: RBNode<T>) {
    let child = parent.left;

    if (child) {
      parent.left = child.right;
      if (child.right)
        child.right.parent = parent;
      child.parent = parent.parent;
      if (!parent.parent)
        this.root = child;
      else if (parent == parent.parent.left)
        parent.parent.left = child;
      else if (parent == parent.parent.right)
        parent.parent.right = child;
    }
  }

  /** Function that is called after a node insertion in order to mantain the
  Red Black Tree properties */
  private fixUp(curNode: RBNode<T>) {
    while (curNode.parent && curNode.parent.color === Colors.Red) {
      if (curNode.parent.parent && curNode.parent === curNode.parent.parent.left) {
        let uncle = curNode.parent.parent.right;
        if (uncle && uncle.color === Colors.Red) {
          curNode.parent.color = Colors.Black;
          uncle.color = Colors.Black;
          curNode.parent.parent.color = Colors.Red;
          curNode = curNode.parent.parent;
        } else if (curNode === curNode.parent.right) {
          curNode = curNode.parent;
          this.leftRotate(curNode);
        }
        curNode.parent!.color = Colors.Black;
        curNode.parent!.parent!.color = Colors.Red;
        this.rightRotate(curNode!.parent!.parent!);
      } else if (curNode.parent.parent && curNode.parent === curNode.parent.parent.right){
        let uncle = curNode.parent.parent.left;
        if (uncle && uncle.color === Colors.Red) {
          curNode.parent.color = Colors.Black;
          uncle.color = Colors.Black;
          curNode.parent.parent.color = Colors.Red;
          curNode = curNode.parent.parent;
        } else if (curNode === curNode.parent.left) {
          curNode = curNode.parent;
          this.rightRotate(curNode);
        }
        curNode.parent!.color = Colors.Black;
        curNode.parent!.parent!.color = Colors.Red;
        this.leftRotate(curNode!.parent!.parent!);
      }
    }
    this.root!.color = Colors.Black;
  }

  /** Auxiliary function to find the reference of an element by its data */
  private findRef(value: T): RBNode<T> | undefined {
    let seekedValue = new RBNode(value, Colors.Red);
    let curNode = this.root;

    while (curNode) {
      if (seekedValue.equals(curNode))
        return curNode;
      else {
        if (seekedValue.greaterThan(curNode))
          curNode = curNode.right;
        else
          curNode = curNode.left;
      }
    }
    return undefined;
  }

  /**
    @param {T} value The value you want to be found
    @returns true if the value is in the tree, false otherwise.
  */
  find(value: T): boolean {
    return (this.findRef(value)) ? true : false;
  }

  /**
    @param {T} value The value that you want to count in the tree.
    @returns The number of elements that match that value.
  */
  count(value: T): number {
    let element = this.findRef(value);
    return (element) ? element.amount : 0;
  }

  /**
    A generator that yields the elements of the tree in order.
  */
  valuesGen() {
    function *helper(curNode: RBNode<T> | undefined): any {
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
}
