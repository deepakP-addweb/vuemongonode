<template>
  <div class="sss" v-if="posts">
    <div class="note-form">
      <input type="text" placeholder="Notes Title" required class="inp" v-model="title" />
      <textarea placeholder="Notes Content" required class="inptext" v-model="content" />
      <input type="hidden" v-model="user_id" />
      <button class="btn" @click="addNote">Add Note</button>
      <p class="err" v-if="errem">Please enter Required fields</p>
    </div>

    <h1>Notes Data from DB</h1>
    <p v-if="da">Loading</p>
    <h2></h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Content</th>
          <th>Create Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.user_id">
          <td>{{ post.user_id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.content }}</td>
          <td>{{ post.Created_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import { io } from "socket.io-client";
import axios from "axios";
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      posts: '',
      title: '',
      content: '',
      user_id: localStorage.getItem('id'),
      errem: false,
      err: false,
      find: false,
      name: '',
      socket: io('http://localhost:3006'),
      user: useAuthStore()
    }
  },

  methods: {
    created() {
      this.getData();
    },
    // Get All Notes Data on Profile PAge
    getData() {
      this.da = true
      var token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        axios.get('http://localhost:3006/notes', {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        }).then(res => {
          this.da = false
          console.log('notes data');
          //console.log(res.data.allNotes);
          this.posts = res.data.allNotes;
        }).catch(err => console.log(err))
      }
    },
    // Save Notes Form Data from Profile Page
    addNote() {
      this.err = false;
      if (!this.title || !this.content) {
        this.errem = true;
        this.err = true;
        return
      } else {
        this.errem = false;
        this.err = false;
      }
      var token = localStorage.getItem('token');
      const data = {
        title: this.title,
        content: this.content,
        user_id: localStorage.getItem('id')
      }
      axios.post('http://localhost:3006/notes', data, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }).then((note) => {
        console.log(note);
        // Send Added Note Data into Server using Socket
        this.socket.emit('save-note', { title: this.title, content: this.content, user_id: this.user_id, Created_date: new Date() });
        this.title = '';
        this.content = '';
        this.$router.push('/home')
      }).catch((err) => {
        this.err = true
        console.log(err)
      })
    }
  },
  created() {
    this.getData();
    // Get New Created Notes Data using Socket
    this.socket.on('new-notes', function (data) {
      console.log('created socket data');
      console.log(data);
      this.posts.push(data.note)
    }.bind(this))
  },
  watch: {
    isAuthenticated() {
      console.log('watcher');
    }
  }

}
</script>
  

<style scoped>
.sss {
  margin-top: 2rem;
  text-align: center;

}

.name {
  color: whitesmoke;
  background-color: #c27 !important;
}

.nav {
  display: flex;
  justify-content: space-around;
  list-style: none;
  z-index: 100;
  background-color: #dadada;
  margin-top: 0 !important;
  padding: 10px;
}

.nav::before {
  content: "";
  position: absolute;
  background-color: rgb(241, 238, 238);
  z-index: -1;
}

.inp {
  width: 90%;
  margin-top: 1rem;
  padding: .6rem;
  outline: none;
  height: 1.8rem;
  font-size: 1rem;
  border-radius: 50px;
  border: .1rem solid rgba(165, 159, 159, 0.377);
  transition: all .2s;
}

.inptext {
  width: 90%;
  margin-top: 1rem;
  padding: .6rem;
  outline: none;
  font-size: 1rem;
  border-radius: 50px;
  border: .1rem solid rgba(165, 159, 159, 0.377);
  transition: all .2s;
}

.inp:focus {
  transform: scale(1);
  transform: scale(1.02);
  border: .1rem solid rgba(146, 143, 143, 0.486);
}

.inp::placeholder {
  color: rgb(139, 122, 122);
  font-size: 1rem;
  letter-spacing: .1rem;
}

.btn {
  margin-top: 1.7rem;
  padding: 1rem;
  color: rgb(129, 106, 106);
  outline: none;
  font-size: .9rem;
  letter-spacing: .2rem;
  background-color: inherit;
  box-shadow: 0 .3rem .4rem rgb(190, 179, 169);
  border-radius: .5rem;
  opacity: .9;
  width: 10rem;
  align-self: center;
  border: .6rem double inherit;
  transition: all .2s;
  cursor: pointer;
}

.btn:hover {
  box-shadow: none;
  border: 1px solid rgb(189, 185, 185);
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

table {
  background-color: transparent;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.table-bordered {
  border: 1px solid #ddd;
}

.table-bordered>thead>tr>th {
  border: 1px solid #ddd;
}

.table-bordered>thead>tr>th {
  border-bottom-width: 2px;
}

.table-bordered>tbody>tr>td,
.table-bordered>tbody>tr>th,
.table-bordered>tfoot>tr>td,
.table-bordered>tfoot>tr>th,
.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
  border: 1px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
}

.err {
  text-align: center;
  border: 1px solid red;
  padding: 1rem;
  box-shadow: 0 1px 1px red;
  border-radius: 1rem;
  color: rgb(15, 10, 10);
}</style>