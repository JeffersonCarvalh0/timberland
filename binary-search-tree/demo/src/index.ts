import { BinarySearchTree } from '../../BinarySearchTree';

let tree = new BinarySearchTree<number>();
let treeRepr = <HTMLElement>document.getElementById('treeRepr');

function refreshScreen() {
  // Refresh the node counter
  let sizeElement = <HTMLElement>document.getElementById('treeSize');
  sizeElement.innerHTML = tree.size.toString();

  // Refresh the tree
  // htmlElements = [];
  // curNode = tree.root;
  // while(true) {
  //   if (curNode) {
  //     htmlElements
  //   }
  // }

}

let insertButton = <HTMLElement>document.getElementById('insertButton');
let input = <HTMLInputElement>document.getElementById('newValueField');

insertButton.onclick = function () {
  tree.insert(parseInt(input.value));
  refreshScreen();
}

let searchButton = <HTMLElement>document.getElementById('searchButton')
let searchField = <HTMLInputElement>document.getElementById('searchField');

searchButton.onclick = function () {
  let result = tree.find(parseInt(searchField.value));
  let resultsSpan = <HTMLElement>document.getElementById('searchResults');

  let text: string;
  text = (result) ? 'Value found' : 'Value not found';
  resultsSpan.innerHTML = text;
}

refreshScreen();
