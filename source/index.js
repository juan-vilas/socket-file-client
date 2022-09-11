"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImage = void 0;
function sendImage(id, base64, type, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        let chunks = base64.match(/.{1,2000}/g);
        let size = chunks === null || chunks === void 0 ? void 0 : chunks.length;
        let data = { id: id, size: size };
        console.log(`Sending ${JSON.stringify(data, null, 4)}`);
        ((chunks) => {
            socket.emit("image2.0", { id: id, size: size }, (response) => {
                console.log(`Server ready to receive ${JSON.stringify(response, null, 4)}`);
                for (var i = 0; i < response.size; i++) {
                    socket.emit(id, { base64: chunks[i], pos: i });
                }
            });
        })(chunks);
    });
}
exports.sendImage = sendImage;
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
