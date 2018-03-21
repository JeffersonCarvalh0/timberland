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

  // /** Function that is called after a node insertion in order to mantain the
  // Red Black Tree properties */
  // private fixUp(newNode: RBNode<T>) {
  //
  // }
}
