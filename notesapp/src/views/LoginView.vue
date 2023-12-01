<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input v-model="name" placeholder="name" type="text" />
      <br />
      <br />
      <input v-model="email" placeholder="email" type="email" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from '@/stores/auth';
import { io } from "socket.io-client";

export default {
  data: () => {
    return {
      name: "",
      email: "",
      user: useAuthStore(),
      socket: io('http://localhost:3006'),
    };
  },
  methods: {
    async login() {
      var namedata;
      var token;
      var userId;
      let data = {
        "name": this.name,
        "email": this.email,
        "isLoggedIn": "1"
      }
      // Send Login Data into Server for Checking Valid Login details
      await axios.post('http://localhost:3006/user/login', data)
        .then((response) => {
          console.log(response.data.user);
          var userinfo = response.data.user;
          namedata = userinfo.name;
          token = response.data.token;
          userId = userinfo._id;
          localStorage.setItem('token', token);
          localStorage.setItem('name', namedata);
          localStorage.setItem('id', userId);
          localStorage.setItem('email', userinfo.email);
          // Set Value into Penia Store variable of logged in user
          this.user.storeLoggedInUser({ userinfo });
          // Get Current login user name as live 
          this.socket.emit('login-name', namedata);
          // Redirect to User Authentication page
          this.$router.push('/home')
          //console.log(user.data.createdUser);
        })
    },
  },
};
</script>