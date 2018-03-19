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
      assert.equal(trie.getSize(), 1, "The trie's size is wrong.");
      assert.equal(trie.find('Elodin'), true, "The newly inserted value was not found.");
    });

    it("Should insert 'Kvothe' in the trie", function() {
      trie.insert('Kvothe', true);
      assert.equal(trie.getSize(), 2, "The trie's size is wrong.");
      assert.equal(trie.find('Kvothe'), true, "The newly inserted value was not found.");
    });
  });

  describe('find', function() {
    it('Should find elements that were inserted in the trie', function() {
      trie.insert('Auri', true);
      assert.equal(trie.find('Auri'), true);
    });

    it('Should not find an element that was not inserted', function() {
      assert.equal(trie.find('Ambrose'), undefined, "Found 'Ambrose' when not supposed to.");
      assert.equal(trie.find(''), undefined, "Found an empty string when not supposed to.");
      assert.equal(trie.find('Aur'), undefined, "Found 'Aur' when not supposed to.");
    });
  });

  describe('remove', function() {
    it('Should remove an existing element from the trie', function() {
      let size = trie.getSize();
      assert.equal(trie.remove('Auri'), true, "The function didn't return false.");
      assert.equal(trie.find('Auri'), undefined, "The find function didn't return undefined.");
      assert.equal(trie.getSize(), size - 1, "The trie's size is wrong.");
    });

    it('Should return false when trying to remove an unexisting element', function() {
      let size = trie.getSize();
      assert.equal(trie.remove('Ambrose'), false, "The function didn't return false.");
      assert.equal(trie.getSize(), size, "The trie's size changed.");
    });

    it('Should remove one element in the same branch, and not the other', function() {
      trie.insert('Beg', true);
      trie.insert('Begin', true);
      trie.insert('Begun', true);
      let size = trie.getSize();

      assert.equal(trie.remove('beg'), true, "The function didn't return true");
      assert.equal(trie.getSize(), size - 1, "The trie's size is wrong.");
      assert.equal(trie.find('beg'), undefined, "'Beg' was still found in the trie.");
      assert.equal(trie.find('begin'), true, "'Begin' was not found in the trie.");
      assert.equal(trie.find('begun'), true, "'Begun was not found in the trie.'")
    });
  });
});
