import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();              // Create Express app
const server = createServer(app);   // Create HTTP server
const io = new Server(server);      // Attach Socket.io to the server

// Get the current directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Send HTML file when visiting root URL
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Socket.io connection event (when a client connects) 
// (socket) represents a client that just connected
// io is the Socket.IO server instance (manages all clients).
io.on("connection", (socket) => {
  console.log("User connected");

  // Client disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Listen for chat messages from client
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit('chat message', msg);   // Broadcast message to all clients
  });
});

// Start the server on port 3000
server.listen(3000, () =>
  console.log(`Server is running at http://localhost:3000`)
);
