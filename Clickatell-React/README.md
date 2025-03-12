# 📊 Real-Time Activity Tracker  

A simple **real-time activity tracker** built with React, featuring WebSocket integration, state management, and a debounced search bar.  

---

## 🚀 Features  
- ✅ **WebSocket Integration**: Receives real-time user activity updates.  
- ✅ **State Management**: Uses `useReducer` or Redux to handle WebSocket messages.  
- ✅ **Search with Debouncing**: Filters activities with a **300ms debounce**.  
- ✅ **Unit Tests**: Includes tests for WebSocket connection and state management (Jest).  

---

## 📦 Tech Stack  
- **React** (Functional Components, Hooks)  
- **WebSockets** (`socket.io-client`)  
- **State Management** (`useReducer` / Redux)  
- **Debouncing** (`lodash.debounce` / custom debounce function)  
- **Testing** (`Jest`, `React Testing Library`)  

---

## 📌 Setup & Installation  

### 1️⃣ Clone the Repository  
```sh
git clone 
cd Clickatell-React
npm install
npm run dev
