<template>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
  </template>
  
  <script>
  import { socket } from "@/socket";
  
  export default {
    name: "ConnectionManager",
  
    methods: {
      connect() {
        console.log(socket.connect());
        socket.connect();
      },
      disconnect() {
        console.log(socket.disconnect());
        socket.disconnect();
      }
    }
  }
  </script>