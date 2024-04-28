// src/socketServer.mjs
import { io } from './server.js';

io.on('connection', (socket) => {
  console.log('Connected:', socket.id);

  socket.on('send-update', (data) => {
    console.log('Update received:', data);
    socket.broadcast.emit('receive-update', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});
