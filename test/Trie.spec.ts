import { Trie } from "../src/Trie";
import { assert } from "chai";
import "mocha";

describe('Testing Trie class', function() {
  let trie = new Trie<string, boolean>(26, (char: string): number => {
    return char.charCodeAt() - 'a'.charCodeAt();
  });

  describe('constructor', function() {
    it('Should return a valid Trie object', function() {
      assert.instanceOf(trie, Trie);
      assert.equal(trie.getSize(), 0);
    });
  });

  describe('insert', function() {
    it('Should insert an element in the trie', function() {
      trie.insert('Elodin', true);
      assert.equal(trie.getSize(), 1);

      trie.insert('Kvothe', true);
      assert.equal(trie.getSize(), 2);
    });
  });
});
