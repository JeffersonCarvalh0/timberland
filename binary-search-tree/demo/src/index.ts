import { BinarySearchTree } from '../../BinarySearchTree';

let tree = new BinarySearchTree<number>();

let treeRepr = <HTMLElement>document.getElementById('treeRepr');
let sizeElement = <HTMLElement>document.getElementById('treeSize');
function refreshScreen() {
  // Refresh the node counter
  sizeElement.innerHTML = tree.getSize().toString();

  // Refresh the tree representation
  let valuesText = [];

  for (let value of tree.valuesGen())
    valuesText.push(value.toString());

  treeRepr.innerHTML = valuesText.join(' ');
}

let insertButton = <HTMLElement>document.getElementById('insertButton');
let input = <HTMLInputElement>document.getElementById('newValueField');
insertButton.onclick = function () {
  tree.insert(parseInt(input.value));
  refreshScreen();
}

let removeButton = <HTMLElement>document.getElementById('removeButton');
removeButton.onclick = function() {
  tree.remove(parseInt(input.value));
  refreshScreen();
}

let clearButton = <HTMLElement>document.getElementById('clearButton');
clearButton.onclick = function() {
  tree.clear();
  refreshScreen();
}

let searchButton = <HTMLElement>document.getElementById('searchButton')
let otherField = <HTMLInputElement>document.getElementById('otherField');
searchButton.onclick = function() {
  let result = tree.find(parseInt(otherField.value));
  let resultsSpan = <HTMLElement>document.getElementById('otherResults');

  let text: string;
  text = (result) ? 'Value found' : 'Value not found';
  resultsSpan.innerHTML = text;
}

let countButton = <HTMLElement>document.getElementById('countButton');
countButton.onclick = function() {
  let result = tree.count(parseInt(otherField.value));
  let resultsSpan = <HTMLElement>document.getElementById('otherResults');
  resultsSpan.innerHTML = `${result} elements found`;
}

refreshScreen();
