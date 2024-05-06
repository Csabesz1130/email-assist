import { io } from './server.js';

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('task-update', (task) => {
    if (!task || !task.id) {
      console.warn('Invalid task update received:', task);
      return;
    }

    console.log('Task update received:', task);
    io.emit('task-updated', task);
  });

  socket.on('event-update', (event) => {
    if (!event || !event.id) {
      console.warn('Invalid event update received:', event);
      return;
    }

    console.log('Event update received:', event);
    io.emit('event-updated', event);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});