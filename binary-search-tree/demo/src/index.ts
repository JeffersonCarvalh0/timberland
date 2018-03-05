import { BinarySearchTree } from '../../BinarySearchTree';

function refreshScreen() {

}

function insert(value: number) {
  tree.insert(value);
  refreshScreen();
}

function main() {
  let sizeParagraph = document.createElement("P");
  let sizeText = document.createTextNode(`Current size: ${treeSize}`);

  sizeParagraph.appendChild(sizeText);
  documentBody.appendChild(sizeParagraph)
}

let tree = new BinarySearchTree<number>();
let treeSize = tree.size;
let documentBody = document.body;

main();
