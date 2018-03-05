import { BinarySearchTree } from '../../BinarySearchTree';

let tree = new BinarySearchTree<number>();

function refreshScreen() {
  // Refresh the node counter
  let sizeElement = <HTMLElement>document.getElementById('treeSize');
  sizeElement.innerHTML = tree.size.toString();

  // Refresh the tree
}

function insert(value: number) {
  tree.insert(value);
  refreshScreen();
}

refreshScreen();
