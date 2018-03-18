import { Trie } from "../src/Trie";
import { assert } from "chai";
import "mocha";

describe('Testing Trie class', function() {
  let trie = new Trie<string, boolean>(26, (char: string): number => {
    return (char.charCodeAt() | 32) - 'a'.charCodeAt();
  });

  describe('constructor', function() {
    it('Should return a valid Trie object', function() {
      assert.instanceOf(trie, Trie);
    });

    it('Its initial size should be zero', function() {
      assert.equal(trie.getSize(), 0);
    });
  });

  describe('insert', function() {
    it("Should insert 'Elodin' in the trie", function() {
      trie.insert('Elodin', true);
      assert.equal(trie.getSize(), 1);
      assert.equal(trie.find('Elodin'), true);
    });

    it("Should insert 'Kvothe' in the trie", function() {
      trie.insert('Kvothe', true);
      assert.equal(trie.getSize(), 2);
      assert.equal(trie.find('Kvothe'), true);
    });
  });

  describe('find', function() {
    it('Should find elements that were inserted in the trie', function() {
      trie.insert('Auri', true);
      assert.equal(trie.find('Auri'), true);
    });

    it('Should not find an element that was not inserted', function() {
      assert.equal(trie.find('Ambrose', undefined));
      assert.equal(trie.find(''), undefined);
      assert.equal(trie.find('Aur'), undefined);
    });
  });
});
