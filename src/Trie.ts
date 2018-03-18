import { NodeData } from "./NodeData";

class TreeNode<R> {
  arr: (TreeNode<R> | undefined)[];
  ret: R | undefined;

  /**
    @param {possibilites} number The maximum number of possibilites each node
    can have
    @param {ret} (R | undefined) The return value of that node
  */
  constructor(possibilities: number, ret: (R | undefined) = undefined) {
    this.arr = [];
    for (let i = 0; i < possibilities; ++i)
      this.arr.push(undefined);
    this.ret = ret;
  }
}

/**
  The class that represents the Trie, or Prefix Tree. It is a generic class that
  is supposed to recieve two different types.

  @param <T> The type of the object you want to store.
  @param <R> The type of return if an object is found. For example, if you are
  creating a dictionary of english words, this could be a string with the word
  definition. If it is just an ortographic corrector, it could be a boolean to
  tell whether the word exists or not.
*/
export class Trie<T, R> {
  private options: number;
  private size: number;
  private root: TreeNode<T,R>;
  private mapFunction: (obj: T) => number;

  /**
    @param {options} number The number of options each node of the tree will
    have. For example, if you are storing words, the number of options will be
    the number of characters available to compose the word. If you consider just
    lowercase characters from the english alphabet, this would be 26.

    @param {func} ((obj: T) => number) A function that directly
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
    this.root = new TreeNode<T, R>(options);
    this.mapFunction = func;
  }

  /**
    @returns The number of elements stored in the tree.
  */
  getSize() {
    return this.size;
  }

  /**
    @param {obj} T Object you want to store in the Trie.
    @param {ret} R The value you want to return when the object is found.
  */
  insert(obj: T[], ret: R) {
    let curNode = this.root;
    for (let element of obj) {
      let index = this.mapFunction(element);
      if (curNode.arr[index])
        curNode = curNode.arr[index];
      else
        curNode.arr[index] = new TreeNode(this.options);
    }
    curNode.ret = ret;
    ++this.size;
  }
}
