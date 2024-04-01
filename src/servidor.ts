import net from "net";
import { spawn } from "child_process";

/**
 * Esta función crea un servidor que se encarga de ejecutar comandos
 * en el sistema operativo y enviar la salida al cliente.
 * @param connection Consiste en la conexión del cliente con el servidor
 * @returns La salida del comando ejecutado en el sistema operativo
 */
net
  .createServer((connection) => {
    /**
     * Esta función se encarga de manejar la conexión con el cliente
     * y ejecutar los comandos recibidos.
     */
    console.log("Un cliente se a conectado.");
    connection.write(`Conexion establecida.`);

    // Manejar los datos recibidos del cliente
    connection.on("data", (datos) => {
      const comando = datos.toString().split(/\s+/);
      const comando1 = comando[0];
      const args: string[] = comando.slice(1);
      // Ejecutar el comando y enviar la respuesta al cliente
      const proceso = spawn(comando1, args);
      console.log(`El comando recibido por el cliente: ${datos.toString()}`);
      proceso.stdout.on("data", (datos) => {
        connection.write(datos);
      });

      // Manejar errores del proceso hijo (spawn)
      proceso.on("error", () => {
        console.error(`Error en la ejecución del comando: ${datos.toString()}`);
        
      });

      proceso.stderr.on("data", (datos) => {
        console.log("Enviar datos al cliente");
        connection.write(datos);
      });

      proceso.on("close", (error) => {
        console.log(`El proceso ha dado un error con código: ${error}`);
      });
    });

    // Manejar errores de conexión
    connection.on("error", (err) => {
      console.error("Error de conexión con el cliente:", err);
    });

    connection.on("close", () => {
      console.log("Un cliente se a desconectado.");
      connection.end();
    });
  })
  .listen(60300, () => {
    console.log("Servidor escuchando en el puerto 60300.");
  });
