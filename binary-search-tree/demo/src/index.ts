import { BinarySearchTree } from '../../BinarySearchTree';

let tree = new BinarySearchTree<number>();

let treeRepr = <HTMLElement>document.getElementById('treeRepr');
let sizeElement = <HTMLElement>document.getElementById('treeSize');
function refreshScreen() {
  // Refresh the node counter
  sizeElement.innerHTML = tree.size.toString();

  // Refresh the tree representation
  let values = tree.inorderValues();
  let valuesText = [];

  for (let value of values)
    valuesText.push(value.toString());

  treeRepr.innerHTML = valuesText.join(' ');
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
