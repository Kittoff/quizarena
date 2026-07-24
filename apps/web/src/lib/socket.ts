import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

let socket: Socket | null = null;

export function getDuelSocket(): Socket {
  socket ??= io(`${API_URL}/duel`, {
    autoConnect: false,
    transports: ["websocket"],
  });
  return socket;
}
