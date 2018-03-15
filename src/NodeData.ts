/** Interface that is needed to be implemented by user made objects so that the
tree can work. These methods will be called when necessary to keep the
increasing order of the tree. */
export interface NodeData<T> {

  /**
    @param {T} obj Value to be compared to. Notice that it has to be of the same type of the caller.
    @returns true if they are equal, false otherwise
  */
  equals?(obj: T): boolean;

  /**
    @param {T} obj Value to be compared to. Notice that it has to be of the same type of the caller.
    @returns true if the caller is greater than obj. false otherwise.
  */
  greaterThan?(obj: T): boolean;
}
