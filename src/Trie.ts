/**
  The class that represents the nodes that are stored in the [[Trie]] class.
*/
export class TrieNode<R> {
  /** The array that stores the next possible children. Each position of this
  array represents a possible node. If there is a children there, another TrieNode
  whill be stored in that position. If there isn't, the value is set to undefined.*/
  children: (TrieNode<R> | undefined)[];

  /** The return value of the node. This is what tells if this node represents
  an element stored in the Trie or not. If it is an element, it will store some
  value of type R to be returned. If it's not, this value is set to undefined. */
  ret: R | undefined;

  /** The amount of children stored in the node. */
  childrenNum: number;

  /**
    @param {number} possibilites The maximum number of possibilites each node
    can have
    @param {R | undefined} ret The return value of that node
  */
  constructor(possibilities: number, ret: (R | undefined) = undefined) {
    this.children = [];
    for (let i = 0; i < possibilities; ++i)
      this.children.push(undefined);
    this.ret = ret;
    this.childrenNum = 0;
  }
}

/**
  The class that represents the Trie, also known as Prefix Tree. It is a generic
   class that is supposed to recieve two different types.

  @param <T> The type of the object you want to store.
  @param <R> The type of return if an object is found. For example, if you are
  creating a dictionary of english words, this could be a string with the word
  definition. If it is just an ortographic corrector, it could be a boolean to
  tell whether the word exists or not.
*/
export class Trie<T, R> {
  private options: number;
  private size: number;
  private root: TrieNode<R>;
  private mapFunction: (obj: T) => number;

  /**
    @param {number} options The number of options each node of the tree will
    have. For example, if you are storing words, the number of options will be
    the number of characters available to compose the word. If you consider just
    lowercase characters from the english alphabet, this would be 26.

    @param {(obj: T) => number} func A function that directly
    maps each object with an index. If we keep the example of the dictionary,
    this function would map each character with an index corresponding to the
    26 positions of the english alphabet(this could be done using the ASCII
    table, for example). The faster this function is, the faster the tree will
    find elements within it, so the ideal case is a function with complexity
    O(n). In other words, it should directly map each object with an index.
      func recieves the object of type T as a parameter and returns the
    index related to it.
  */
  constructor(options: number, func: (obj: T) => number) {
    this.options = options;
    this.size = 0;
    this.root = new TrieNode<R>(options);
    this.mapFunction = func;
  }

  /**
    This function will return the root of the Trie. Use it if you want to perform
    custom operations in the Trie.
    @returns a [[TrieNode]].
  */
  getRoot(): TrieNode<R> {
    return this.root;
  }

  /**
    Gets the index from the mapFunction provided by the user. Then, it checks
    if it is a valid index.
    @param {T} obj The object being searched
    @returns The object's index or -1
  */
  private getIndex(obj: T): number {
    let index = this.mapFunction(obj);
    if (index < 0 || index >= this.options)
      return -1; // Modify this later to throw an error
    return index;
  }

  /**
    @returns The number of elements stored in the tree.
  */
  getSize() {
    return this.size;
  }

  /**
    @param {T[]} obj Object you want to store in the Trie.
    @param {R} ret The value you want to return when the object is found.
  */
  insert(obj: T[], ret: R) {
    let curNode = this.root;
    for (let element of obj) {
      let index = this.getIndex(element);
      if (!curNode.children[index])
        curNode.children[index] = new TrieNode(this.options);
      curNode = <TrieNode<R>>curNode.children[index];
    }
    curNode.ret = ret;
    ++curNode.childrenNum;
    ++this.size;
  }

  /**
    @param {T[]} obj The object you want to find in the Trie.
    @returns The value that was stored in insertion if the object was inserted;
    undefined otherwise.
  */
  find(obj: T[]): R | undefined {
    let curNode = this.root;
    for (let element of obj) {
      let index = this.getIndex(element);
      if (curNode.children[index])
        curNode = <TrieNode<R>>curNode.children[index];
      else
        return undefined;
    }
    return curNode.ret;
  }

  /**
    @param {T[]} obj The object to be removed
    @returns true if the object was found and removed, false otherwise
  */
  remove(obj: T[]): boolean {
    let pairs: [TrieNode<R>, TrieNode<R>, number][] = [];
    let parent = this.root;
    let child: TrieNode<R>;

    for (let element of obj) {
      let index = this.mapFunction(element);
      if (!parent.children[index])
        return false;
      else {
        child = <TrieNode<R>>parent.children[index];
        pairs.push([parent, child, index]);
        parent = child;
      }
    }
    parent = pairs[pairs.length - 1][0];
    child = pairs[pairs.length - 1][1];
    let index = pairs[pairs.length - 1][2];

    if (child.childrenNum > 0) { // If there are elements after this node
      child.ret = undefined;
      --this.size;
      return true;
    }

    // If there aren't, exclude the node...
    parent.children[index] = undefined;
    --parent.childrenNum;

    // ...and go to the previous one.
    for (let i = pairs.length - 2; i >= 0; --i) {
      parent = pairs[i][0];
      child = pairs[i][1];
      index = pairs[i][2];

      // Check if there are other children or if it is another element
      if (child.childrenNum > 0 || child.ret)
        return true;
      else {
        parent.children[index] = undefined;
        --parent.childrenNum;
      }
    }
    return true;
  }
}
