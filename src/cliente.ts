import net from "net";
import readline from "readline";

const cliente = net.createConnection({ port: 60300 }, () => {});

const timer = setTimeout(() => {
  console.log("Conexión establecida con el servidor");
  console.log("Ingrese un comando para enviar al servidor:");
}, 1500);

// Crear una interfaz readline para leer la entrada del usuario desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Manejar la entrada del usuario y enviar los comandos al servidor
rl.on("line", (input) => {
  // Enviar el comando al servidor
  cliente.write(input);

  // Verificar si el usuario ha terminado de escribir
  if (input === "exit") {
    // Cerrar la conexión con el servidor
    cliente.end();
    rl.close(); // Cerrar la interfaz readline
  }
});

// Manejar los datos recibidos del servidor
cliente.on("data", (data) => {
  console.log(data.toString());
});

// Manejar errores de conexión
cliente.on("error", (err) => {
  console.error("Error de conexión:", err);
});

// Manejar la desconexión del servidor
cliente.on("end", () => {
  console.log("Desconexión del servidor");
  rl.close(); // Cerrar la interfaz readline
  clearTimeout(timer); // Limpiar el temporizador
});

// Manejar el evento de error del proceso hijo (spawn)
process.on("uncaughtException", (err) => {
  console.error("Error inesperado:", err);
});
