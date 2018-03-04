import { BinarySearchTree } from './BinarySearchTree.js';

let tree = new BinarySearchTree<number>();
let treeSize = tree.size;
let documentBody = document.body;

let sizeParagraph = document.createElement("P");
let sizeText = document.createTextNode("Current size: ${treeSize}");

sizeParagraph.appendChild(sizeText);
documentBody.appendChild(sizeParagraph)

function refreshScreen() {

}

function insert(value) {
  tree.insert(value);
  refreshScreen();
}
