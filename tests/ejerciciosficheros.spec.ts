import "mocha";
import { expect } from "chai";

import { writeFile } from "fs";

import { add } from "../src/ejercicioficheros.js";

describe("File Writer", () => {
  it("should create a file with 'Hello World!' content", (done) => {
    writeFile("src/helloworld.txt", "Hello World!", (err) => {
      if (err) {
        done(err);
        return;
      }
      console.log("File helloworld.txt has just been created");
      done();
    });
  });
});


describe("writeHelloWorld", () => {
  it("should create a file with 'Hello World!' content", async () => {
    try {
      await writeHelloWorld();
      // Aquí podrías agregar más aserciones para verificar si el archivo fue creado correctamente
      // Por ejemplo, podrías usar fs.existsSync() para verificar si el archivo existe
      // y fs.readFileSync() para leer el contenido del archivo y verificar si es "Hello World!"
    } catch (error) {
      // Si ocurrió un error durante la escritura del archivo, falla el test
      // y muestra el mensaje de error
      throw new Error(`Failed to create file: ${error.message}`);
    }
  });
});

export function writeHelloWorld(): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile("src/helloworld.txt", "Hello World!", (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("File helloworld.txt has just been created");
      resolve();
    });
  });
}

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