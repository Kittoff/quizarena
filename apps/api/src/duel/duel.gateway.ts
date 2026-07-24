import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { DuelService } from './duel.service';

@WebSocketGateway({
  namespace: 'duel',
  cors: { origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000' },
})
export class DuelGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;

  constructor(private readonly duelService: DuelService) {}

  afterInit(server: Server) {
    this.duelService.attachServer(server);
  }

  handleConnection() {
    // no-op: player identity arrives with the "duel:join" message
  }

  handleDisconnect(client: Socket) {
    this.duelService.handleDisconnect(client.id);
  }

  @SubscribeMessage('duel:join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { userId: string; username: string; language?: string },
  ) {
    const result = await this.duelService.join({
      socketId: client.id,
      userId: payload.userId,
      username: payload.username,
      language: payload.language ?? 'fr',
    });

    if (result.status === 'queued') {
      client.emit('duel:queued');
    }
  }

  @SubscribeMessage('duel:leave')
  handleLeave(@ConnectedSocket() client: Socket) {
    this.duelService.leaveQueue(client.id);
  }

  @SubscribeMessage('duel:answer')
  async handleAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { gameId: string; questionIndex: number; answerId: number },
  ) {
    await this.duelService.submitAnswer(client.id, payload);
  }
}
