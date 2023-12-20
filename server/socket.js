const socketIo = require('socket.io');

module.exports = (socketIo) => {
  // Listen for new connections
  socketIo.on('connection', (socket) => {
    console.log('New connection established');

    // Emit a message to all connected clients to announce the new user
    socket.emit('newUser', { username: socket.username });

    // Listen for chat messages from the client
    socket.on('chatMessage', (chatMessage) => {
      console.log(`Received chat message from ${chatMessage.sender}`);

      // Emit the chat message to all connected clients
      socketIo.emit('chatMessage', chatMessage);
    });
  });
};
