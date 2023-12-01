<template>
  <div class="ss">
    Successfully logged out
  </div>
</template>
  
<script>
import { useAuthStore } from '@/stores/auth';
import { io } from "socket.io-client";
import axios from "axios";
export default {
  data: () => {
    return {
      user: useAuthStore(),
      socket: io('http://localhost:3006')
    };
  },
  methods: {
    signout() {
      let data = {
        "email": localStorage.getItem('email') || 'aassddssd@gmail.com'
      }
      console.log(data);
      // Send API request for logout as set loggedin field as 0
      axios.post('http://localhost:3006/user/logout', data)
        .then((response) => {
          console.log(response.data.user);
          // Get Real Time Logged User name 
          this.socket.emit('login-name', null);
          // Store into Penia store variable value as null 
          this.user.storeLoggedInUser({user:null})
          localStorage.clear();
          this.$router.push('/')
        })
    }
  },

  created() {
    this.signout();
  }
}
</script>
  
  
  
<style scoped>
.ss {

  margin-top: 10rem;
  text-align: center;

}
</style>