import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export async function sendImage(
  id: string,
  base64: string,
  type: string,
  socket: Socket
) {
  let chunks = base64.match(/.{1,2000}/g);
  let size = chunks?.length;
  let data = { id: id, size: size };

  console.log(`Sending ${JSON.stringify(data, null, 4)}`);
  ((chunks: Array<string>) => {
    socket.emit("image2.0", { id: id, size: size }, (response: any) => {
      console.log(
        `Server ready to receive ${JSON.stringify(response, null, 4)}`
      );
      for (var i = 0; i < response.size; i++) {
        socket.emit(id, { base64: chunks[i], pos: i });
      }
    });
  })(chunks as Array<string>);
}

// (async () => {
//   const socket = io("http://127.0.0.1:4747", {
//     reconnection: true,
//     reconnectionDelay: 3000,
//     reconnectionDelayMax: 2000,
//     reconnectionAttempts: 100,
//     rejectUnauthorized: false,
//   });

//   socket.on("connect", () => {
//     console.log("[*] Socket connected");
//     sendImage(Date.now().toString(), file, "png", socket);
//   });
// })();
