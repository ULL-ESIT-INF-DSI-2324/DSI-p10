import "mocha";
import { expect } from "chai";

import { add } from "../src/ejercicioficheros.js";


describe("add", () => {
  it("should return 8 when adding 1 and 7", () => {
    expect(add(1, 7)).to.equal(8);
  });

  
  it("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).to.be.equal(9);
  });
  
  it("add(-1, 8) returns value 7", () => {
    expect(add(-1, 8)).to.be.equal(7);
  });

});