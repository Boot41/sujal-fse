import { io } from "socket.io-client";

// Connect to the WebSocket server
const socket = io("http://localhost:5000");

// When connected
socket.on("connect", () => {
  console.log("✅ Connected to WebSocket server");
});

// Listen for stock updates
socket.on("stockUpdated", (data) => {
  console.log("📢 Stock Updated:", data);
});

// Listen for stock deletions
socket.on("stockDeleted", (productId) => {
  console.log("❌ Product Deleted:", productId);
});

// Handle disconnect
socket.on("disconnect", () => {
  console.log("❌ Disconnected from WebSocket server");
});
