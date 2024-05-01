import { io } from './server.js';  // Ensure this imports correctly based on your server setup

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Listening for task updates
  socket.on('task-update', (task) => {
    console.log('Task update received:', task);
    io.emit('task-updated', task);  // Broadcast to all clients
  });

  // Listening for event updates
  socket.on('event-update', (event) => {
    console.log('Event update received:', event);
    io.emit('event-updated', event);  // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
