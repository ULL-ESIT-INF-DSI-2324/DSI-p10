import { writeFile, readFile, watchFile } from "fs";
import { spawn } from "child_process";
import net from "net";

/**
 * Esta funcion es la que se encarga de escribir en un fichero
 * en este caso en el fichero helloworld.txt
 */
writeFile("src/helloworld.txt", "Hello World!", () => {
  console.log("File helloworld.txt has just been created");
});

/**
 * Esta funcion es la que se encarga de leer un fichero
 * en este caso en el fichero what.txt
 */
readFile("src/helloworld.txt", (_, data) => {
  //console.log("File helloworld.txt has just been read");
  console.log(data.toString());
});

/**
 * Esta funcion es la que se encarga de leer un fichero
 * en este caso en el fichero what.txt
 */
watchFile("src/helloworld.txt", (curr, prev) => {
  console.log(`File size was ${prev.size} bytes before it was modified`);
  console.log(`Now file size is ${curr.size} bytes`);

  const cat = spawn("cat", ["src/helloworld.txt"]);
  cat.stdout.pipe(process.stdout);

  const wc = spawn("wc", ["src/helloworld.txt"]);

  let wcOutput = "";
  wc.stdout.on("data", (piece) => (wcOutput += piece));

  wc.on("close", () => {
    const wcOutputAsArray: string[] = wcOutput.split(/\s+/);
    console.log(`File helloworld.txt has ${wcOutputAsArray[1]} lines`);
    console.log(`File helloworld.txt has ${wcOutputAsArray[2]} words`);
    console.log(`File helloworld.txt has ${wcOutputAsArray[3]} characters`);
  });
});

/**
 * Adds two __numbers__
 * @param firstNumber Consists of the first operand of the addition
 * @param secondNumber Consists of the second operand of the addition
 * @returns The addition of the two numbers `firstNumber` and `secondNumber`
 * ```typescript
 * add(1, 7) = 8
 * ```
 */
export function add(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

console.log(`add(1, 7): ${add(1, 7)}`);

net
  .createServer((connection) => {
    console.log("A client has connected.");

    connection.write(`Connection established.`);

    connection.on("close", () => {
      console.log("A client has disconnected.");
    });
  })
  .listen(60300, () => {
    console.log("Waiting for clients to connect.");
  });
