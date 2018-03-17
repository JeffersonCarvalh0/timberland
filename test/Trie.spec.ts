import { Trie } from "../src/Trie";
import { assert } from "chai";
import "mocha";

describe('Testing Trie class', function() {
  let alphabet = [];
  for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); ++i)
    alphabet.push(String.fromCharCode(i));

  let trie = new Trie<string, boolean>(alphabet);

  describe('constructor', function() {
    it('Should return a valid Trie object', function() {
      assert.instanceOf(trie, Trie);
      assert.equal(trie.getSize(), 0);
    });
  });
});
