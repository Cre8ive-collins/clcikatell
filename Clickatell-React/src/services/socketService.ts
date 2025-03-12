
import { io, Socket } from 'socket.io-client';
import { Activity } from '../types/activity';

// Mock WebSocket URL (in a real app, this would be a real WebSocket endpoint)
const SOCKET_URL = 'wss://localhost:8080';

// This class manages the WebSocket connection
class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();
  private activityIntervalId: NodeJS.Timeout;

  connect(): void {
    try {
      // this.socket = io(SOCKET_URL, {
      //   transports: ['websocket'],
      //   autoConnect: true,
      // });

      // For mock implementation, simulate WebSocket events
      this.setupMockEvents();

      console.log('Socket connected');
    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }

  // Disconnect from the WebSocket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('Socket disconnected');
    }
  }

  // Add a listener for a specific event
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);

    // If we have a real socket, add the listener
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Remove a listener for a specific event
  off(event: string, callback: (data: any) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }

    // If we have a real socket, remove the listener
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Setup mock events for development
  private setupMockEvents(): void {
    const eventTypes: Activity['type'][] = ['login', 'logout', 'update', 'error'];
    const usernames = [
      'john_doe', 'jane_smith', 'alex_wilson', 'sarah_johnson',
      'mike_brown', 'emily_davis', 'chris_martinez', 'lisa_taylor'
    ];

    // Generate a random activity every few seconds
    this.activityIntervalId = setInterval(() => {
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
      const userId = randomUsername.split('_')[0] + Math.floor(Math.random() * 1000);

      let details = '';
      switch (randomType) {
        case 'login':
          details = 'Logged in successfully';
          break;
        case 'logout':
          details = 'Logged out';
          break;
        case 'update':
          details = 'Updated profile information';
          break;
        case 'error':
          details = 'Failed login attempt';
          break;
      }

      const activity: Activity = {
        id: Math.random().toString(36).substring(2, 15),
        userId,
        username: randomUsername,
        type: randomType,
        timestamp: new Date(),
        details,
      };

      const activityListeners = this.listeners.get('activity');
      if (activityListeners) {
        activityListeners.forEach(callback => callback(activity));
      }
    }, 5000); // Generate a new activity every 5 seconds
  }
}

export const socketService = new SocketService();
