// src/stompClient.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class StompClient {
  constructor(onConnect, onError) {
    // URL is now hardcoded in the constructor
    this.url = "http://localhost:8080/api/ws"; // WebSocket endpoint
    this.onConnect = onConnect;
    this.onError = onError;

    // Create a STOMP client instance
    this.client = new Client({
      brokerURL: this.url,
      connectHeaders: {},
      debug: (str) => console.log(str), // Debugging logs
      reconnectDelay: 5000, // Reconnect after 5 seconds if the connection is lost
      heartbeatIncoming: 0, // No incoming heartbeat
      heartbeatOutgoing: 20000, // Send outgoing heartbeat every 20 seconds
      onConnect: this.onConnect, // Called when connected
      onDisconnect: () => {
        console.log("Disconnected");
      },
      onStompError: this.onError, // Called on STOMP error
    });

    // Setting up the WebSocket connection
    this.client.webSocketFactory = () => new SockJS(this.url);
  }

  // Connect method
  connect() {
    this.client.activate();
  }

  // Disconnect method
  disconnect() {
    this.client.deactivate();
  }

  // Subscribe to a topic
  subscribeToTopic(topic, callback) {
    return this.client.subscribe(topic, callback);
  }

  // Send a message to a specific destination
  sendMessage(destination, body, headers = {}) {
    this.client.publish({ destination, body, headers });
  }
}

// Creating a default instance so we don't need to instantiate it every time
const stompClient = new StompClient(
  (frame) => console.log("Connected:", frame), // On connect callback
  (error) => console.error("STOMP error:", error) // On error callback
);

export default stompClient;
