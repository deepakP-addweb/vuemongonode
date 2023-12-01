//Setup LoggedIn store
import { defineStore } from 'pinia';


export const useAuthStore = defineStore("auth", {
    state: () => ({
      user: JSON.parse(localStorage.getItem('user')),
  }),

    getters: {
      isAuthenticated: (state) => !!state?.user
    },
    actions: {
      storeLoggedInUser(user) {
        // Save the user to localStorage
        //localStorage.setItem('user', user);
        // Save the  and user to the store
        console.log('user store');
        console.log(user);
        const stringifiedUser = JSON.stringify (user);
        localStorage.setItem('user', stringifiedUser);
        this.user = user;
     }
    }
  });
  export default useAuthStore;